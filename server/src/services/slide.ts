// internal-imports
import { prisma, type Slide } from '@/core/index.js';

// function to create slide
export async function createSlide(data: Omit<Slide, 'id' | 'createdAt'>) {
  return await prisma.slide.create({
    data: {
      deckId: data.deckId,
      title: data.title,
      content: data.content,
      order: data.order,
      imagePrompt: data.imagePrompt,
      imageUrl: data.imageUrl,
    },
  });
}
