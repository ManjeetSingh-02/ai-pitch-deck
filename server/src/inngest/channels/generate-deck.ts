// external-imports
import { realtime } from 'inngest';
import z from 'zod';

export const generateDeckChannel = realtime.channel({
  name: ({ deckId }: { deckId: string }) => `generate-deck:${deckId}`,
  topics: {
    status: {
      schema: z.object({
        progress: z.number().min(0).max(100),
        status: z.enum(['GENERATING', 'READY', 'ERROR']),
        data: z
          .object({
            title: z.string().trim().nonempty(),
            description: z.string().trim().nonempty(),
          })
          .optional(),
      }),
    },
  },
});
