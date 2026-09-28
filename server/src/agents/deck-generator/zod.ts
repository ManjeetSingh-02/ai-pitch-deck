// external-imports
import z from 'zod';

// schema for Slide
const SlideSchema = z.object({
  title: z.string().trim().min(5).max(50),
  content: z.string().trim().min(30).max(300),
  imagePrompt: z.string().trim().min(20).max(200),
});

// schema for Deck
export const DeckGeneratorSchema = z.object({
  title: z.string().trim().min(10).max(100),
  description: z.string().trim().min(30).max(300),
  slides: z.array(SlideSchema).min(5).max(8),
});
