// internal-imports
import {
  ErrorResponse,
  prisma,
  SuccessResponse,
  type Authenticated,
  type Validated,
} from '@/core/index.js';
import type { createDeckSchema, deckIdSchema } from './zod.js';

// external-imports
import type { Request, Response } from 'express';

// controller for module
export const controller = {
  // @controller GET /
  listDecks: async (request: Request & Authenticated, response: Response) => {
    // find all decks
    const decks = await prisma.deck.findMany({
      where: {
        userId: request.user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        updatedAt: true,
        createdAt: true,
        status: true,
        _count: {
          select: {
            slides: true,
          },
        },
      },
    });

    // return response with success
    return response.status(200).json(
      new SuccessResponse({
        data: decks,
        message: 'Decks retrieved successfully',
        meta: {
          total: decks.length,
        },
      })
    );
  },

  // @controller GET /:id
  listDeck: async (
    request: Request & Authenticated & Validated<typeof deckIdSchema>,
    response: Response
  ) => {
    // find deck
    const deck = await prisma.deck.findFirst({
      where: {
        id: request.validated.params.id,
        userId: request.user.id,
      },
      omit: {
        userId: true,
      },
      include: {
        slides: {
          omit: {
            deckId: true,
          },
        },
      },
    });

    // if deck not found, throw error
    if (!deck)
      throw new ErrorResponse({
        code: 404,
        message: 'Deck not found',
      });

    // return response with success
    return response.status(200).json(
      new SuccessResponse({
        data: deck,
        message: 'Deck retrieved successfully',
      })
    );
  },

  // @controller POST /
  createDeck: async (
    request: Request & Authenticated & Validated<typeof createDeckSchema>,
    response: Response
  ) => {
    // create a new deck
    const deck = await prisma.deck.create({
      data: {
        userId: request.user.id,
        prompt: request.validated.body.prompt,
      },
    });

    // return response with success
    return response.status(201).json(
      new SuccessResponse({
        data: {
          id: deck.id,
        },
        message: 'Deck created successfully',
      })
    );
  },

  // @controller DELETE /
  deleteDecks: async (request: Request & Authenticated, response: Response) => {
    // delete all decks
    await prisma.deck.deleteMany({
      where: {
        userId: request.user.id,
      },
    });

    // return response with success
    return response.status(204).send();
  },

  // @controller DELETE /:id
  deleteDeck: async (
    request: Request & Authenticated & Validated<typeof deckIdSchema>,
    response: Response
  ) => {
    // delete deck
    await prisma.deck.delete({
      where: {
        id: request.validated.params.id,
        userId: request.user.id,
      },
    });

    // return response with success
    return response.status(204).send();
  },
};
