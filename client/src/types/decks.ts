import type { Realtime } from 'inngest';

type Deck = {
  id: string;
  prompt: string;
  status: 'PENDING' | 'GENERATING' | 'READY' | 'ERROR';
  progress: number;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    slides: number;
  };
};

type Slide = {
  id: string;
  title: string;
  createdAt: string;
  content: string;
  imagePrompt: string;
  order: number;
  imageUrl: string | null;
};

type ApiResponse<T, M = undefined> = {
  success: true;
  message: string;
  data: T;
  meta?: M;
};

export type DecksResponse = ApiResponse<Omit<Deck, 'prompt'>[], { total: number }>;

export type DeckResponse = ApiResponse<Omit<Deck, '_count'> & { slides: Slide[] }>;

export type DeckRealtimeTokenResponse = ApiResponse<{ token: Realtime.Subscribe.ClientToken }>;

export type DeckRealtimeData = Pick<Deck, 'progress' | 'status'> & {
  data?: Pick<Deck, 'title' | 'description'>;
};

export type CreateDeckResponse = ApiResponse<Pick<Deck, 'id'>>;

export type CreateDeckData = Pick<Deck, 'prompt'>;
