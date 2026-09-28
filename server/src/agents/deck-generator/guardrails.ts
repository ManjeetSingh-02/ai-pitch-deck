// external-imports
import { type InputGuardrail } from '@openai/agents';

// guardrail to validate the deck prompt
export const validateDeckPrompt: InputGuardrail = {
  name: 'Validate Deck Prompt',
  execute: async ({ input }) => {
    const invalidLength = input.length < 30 || input.length > 300;

    return {
      tripwireTriggered: invalidLength,
      outputInfo: invalidLength
        ? ['The prompt must be between 30 and 300 characters long.']
        : undefined,
    };
  },
};
