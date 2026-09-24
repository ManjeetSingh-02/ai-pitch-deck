// internal-imports
import { env } from '../config/env.js';

// external-imports
import OpenAI from 'openai';

// create an instance of OpenAI
export const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
