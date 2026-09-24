// internal-imports
import { authenticate, validateZodSchema } from '@/core/index.js';
import { controller } from './controller.js';
import { createDeckSchema, deckIdSchema } from './zod.js';

// external-imports
import { Router, type RequestHandler } from 'express';

// router for module
export const router = Router();

// @route GET /
router.get('/', authenticate, controller.listDecks as RequestHandler);

// @route GET /:id
router.get(
  '/:id',
  authenticate,
  validateZodSchema(deckIdSchema),
  controller.listDeck as RequestHandler
);

// @route POST /
router.post(
  '/',
  authenticate,
  validateZodSchema(createDeckSchema),
  controller.createDeck as RequestHandler
);

// @route DELETE /
router.delete('/', authenticate, controller.deleteDecks as RequestHandler);

// @route DELETE /:id
router.delete(
  '/:id',
  authenticate,
  validateZodSchema(deckIdSchema),
  controller.deleteDeck as RequestHandler
);
