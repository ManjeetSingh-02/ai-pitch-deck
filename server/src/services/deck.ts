// internal-imports
import { prisma, type Deck } from '@/core/index.js';

// function to fetch deck
export async function fetchDeck(id: Deck['id']) {
  const deck = await prisma.deck.findUnique({
    where: { id },
    select: { id: true, prompt: true, userId: true },
  });
  if (!deck) throw new Error('Deck not found');

  return deck;
}

// function to update deck
export async function updateDeck(
  id: Deck['id'],
  data: Partial<Pick<Deck, 'title' | 'description' | 'progress' | 'status'>>
) {
  return prisma.deck.update({
    where: { id },
    data,
  });
}
