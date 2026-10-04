// internal-imports
import { inngest, type Deck } from '@/core/index.js';
import {
  createSlide,
  fetchDeck,
  generateDeckContent,
  generateImage,
  updateDeck,
  uploadImage,
} from '@/services/index.js';
import { generateDeckChannel } from '../channels/generate-deck.js';

export const generateDeck = inngest.createFunction(
  {
    id: 'generate-deck',
    retries: 1,
    triggers: [{ event: 'deck/generate' }],
  },
  async ({ event, step }) => {
    // extract the deck id
    const { id } = event.data;

    // step to fetch the deck
    const deck = await step.run('fetch-deck', async () => fetchDeck(id));

    // create a channel
    const channel = generateDeckChannel({ deckId: deck.id });

    // initialize status and progress
    let status: Exclude<Deck['status'], 'PENDING'> = 'GENERATING';
    let progress: number = 0;

    try {
      // mark the deck as generating
      await step.run('mark-deck-generating', async () =>
        updateDeck(deck.id, {
          status,
          progress,
        })
      );

      // publish the deck as generating
      await step.realtime.publish('publish-deck-generating', channel.status, {
        status,
        progress,
      });

      // generate the deck content
      const { title, description, slides } = await step.run('generate-deck-content', async () =>
        generateDeckContent(deck.prompt)
      );

      // update deck content
      await step.run('update-deck-content', async () =>
        updateDeck(deck.id, {
          title,
          description,
        })
      );

      // update progress to 20%
      progress = 20;

      // mark the deck as updated
      await step.run('mark-deck-updated', async () => updateDeck(deck.id, { progress }));

      // publish the deck as updated
      await step.realtime.publish('publish-deck-updated', channel.status, {
        status,
        progress,
        data: {
          title,
          description,
        },
      });

      // loop through the generated slides
      for (const [index, slide] of slides.entries()) {
        // order of the slide
        const order = index + 1;

        // generate and upload the slide image
        const { url } = await step.run(`generate-upload-slide-${order}-image`, async () => {
          const buffer = await generateImage(slide.imagePrompt);
          return uploadImage(buffer, deck.userId, deck.id, `slide-${order}.png`);
        });

        // create the slide
        await step.run(`create-slide-${order}`, async () =>
          createSlide({
            deckId: deck.id,
            imageUrl: url,
            order,
            ...slide,
          })
        );

        // update progress based on completed slides
        progress = 20 + Math.round(((index + 1) / slides.length) * 79);

        // update the deck progress
        await step.run(`update-deck-progress-${progress}`, () => updateDeck(deck.id, { progress }));

        // publish the deck progress
        await step.realtime.publish(`publish-deck-progress-${progress}`, channel.status, {
          status,
          progress,
        });
      }

      // mark the deck as ready
      await step.run('mark-deck-ready', () =>
        updateDeck(deck.id, {
          status: 'READY',
          progress: 100,
        })
      );

      // update status to READY and progress to 100%
      status = 'READY';
      progress = 100;

      // publish the deck as ready
      await step.realtime.publish('publish-deck-ready', channel.status, {
        status,
        progress,
      });
    } catch (error) {
      console.error(error);
      // mark the deck as error
      await step.run('mark-deck-error', async () => updateDeck(deck.id, { status: 'ERROR' }));

      // update status to ERROR
      status = 'ERROR';

      // publish the deck as error
      await step.realtime.publish('publish-deck-error', channel.status, {
        status,
        progress,
      });
    }
  }
);
