// internal-imports
import { deckGeneratorAgent, DeckGeneratorSchema } from '@/agents/index.js';
import { env, openai } from '@/core/index.js';

// external-imports
import { InputGuardrailTripwireTriggered, run } from '@openai/agents';

// function to generate deck content
export async function generateDeckContent(prompt: string) {
  try {
    const { finalOutput } = await run(deckGeneratorAgent, prompt);
    return DeckGeneratorSchema.parse(finalOutput);
  } catch (error) {
    throw error instanceof Error
      ? error.message
      : error instanceof InputGuardrailTripwireTriggered
        ? error.result.output.outputInfo.join('\n')
        : 'Something went wrong while generating the deck content';
  }
}

// function to generate image
export async function generateImage(prompt: string) {
  return env.USE_PLACEHOLDER_IMAGES ? fetchPlaceholderImage() : createImageFromOpenAI(prompt);
}

// function to fetch placeholder image
async function fetchPlaceholderImage() {
  try {
    const response = await fetch('https://picsum.photos/1024/1024');

    if (!response.ok) throw new Error('Could not download placeholder image');
    const bytes = await response.arrayBuffer();

    return Buffer.from(bytes);
  } catch (error) {
    throw error instanceof Error
      ? error.message
      : 'Something went wrong while fetching the placeholder image';
  }
}

// function to create image from OpenAI
async function createImageFromOpenAI(prompt: string) {
  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      model: 'gpt-image-1-mini',
    });

    const base64Image = response.data?.[0]?.b64_json;
    if (!base64Image) throw new Error('Failed to generate image');

    return Buffer.from(base64Image, 'base64');
  } catch (error) {
    throw error instanceof Error
      ? error.message
      : 'Something went wrong while generating the image';
  }
}
