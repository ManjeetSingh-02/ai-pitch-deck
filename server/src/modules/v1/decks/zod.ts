// external-imports
import z from 'zod';

// schema for deckId
export const deckIdSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});

// schema for createDeck
export const createDeckSchema = z.object({
  body: z.object({
    prompt: z.string().trim().nonempty(),
  }),
});
