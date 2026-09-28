// internal-imports
import { DECK_GENERATOR_AGENT_CONFIG } from './config.js';
import { validateDeckPrompt } from './guardrails.js';
import { DeckGeneratorSchema } from './zod.js';

// external-imports
import { Agent } from '@openai/agents';

// agent to generate deck
export const deckGeneratorAgent = new Agent<unknown, typeof DeckGeneratorSchema>({
  name: DECK_GENERATOR_AGENT_CONFIG.NAME,
  model: DECK_GENERATOR_AGENT_CONFIG.MODEL,
  instructions: DECK_GENERATOR_AGENT_CONFIG.INSTRUCTIONS,
  outputType: DeckGeneratorSchema,
  inputGuardrails: [validateDeckPrompt],
});
