import { axiosInstance } from '@/lib/axios';
import type {
  CreateDeckData,
  CreateDeckResponse,
  DeckRealtimeTokenResponse,
  DeckResponse,
  DecksResponse,
} from '@/types/decks';

export const decks = {
  // GET /decks
  list: async () => {
    const { data } = await axiosInstance.get<DecksResponse>('/decks');
    return data;
  },

  // GET /decks/:id
  get: async (id: string) => {
    const { data } = await axiosInstance.get<DeckResponse>(`/decks/${id}`);
    return data;
  },

  // GET /decks/:id/realtime
  getRealtimeToken: async (id: string) => {
    const { data } = await axiosInstance.get<DeckRealtimeTokenResponse>(`/decks/${id}/realtime`);
    return data;
  },

  // POST /decks
  create: async (data: CreateDeckData) => {
    const { data: d } = await axiosInstance.post<CreateDeckResponse>('/decks', data);
    return d;
  },

  // DELETE /decks
  deleteAll: async () => {
    return await axiosInstance.delete('/decks');
  },

  // DELETE /decks/:id
  delete: async (id: string) => {
    return await axiosInstance.delete(`/decks/${id}`);
  },
};
