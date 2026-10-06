import { decks } from '@/api/decks';
import { deckKeys, queryClient } from '@/lib/query';
import type { CreateDeckData, DeckRealtimeData, DeckResponse, DecksResponse } from '@/types/decks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRealtime } from 'inngest/react';
import { useEffect } from 'react';

export const useDecks = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: deckKeys.lists(),
    queryFn: () => decks.list(),
  });

  return {
    meta: data?.meta,
    data: data?.data,
    isLoading,
    isError,
    error,
  };
};

export const useDeck = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: deckKeys.detail(id),
    queryFn: () => decks.get(id),
  });

  return {
    data: data?.data,
    isLoading,
    isError,
    error,
  };
};

export const useDeckRealtime = (id: string) => {
  const { connectionStatus, error, messages, reset, runStatus } = useRealtime({
    channel: `generate-deck:${id}`,
    enabled: Boolean(id),
    topics: ['status'] as const,
    token: async () => {
      const { data } = await decks.getRealtimeToken(id);
      return data.token;
    },
  });
  const realtimeData = messages.byTopic.status?.data as DeckRealtimeData | undefined;

  useEffect(() => {
    if (!id || !realtimeData) return;

    queryClient.setQueryData<DecksResponse>(
      deckKeys.lists(),
      old =>
        old && {
          ...old,
          data: old.data.map(d =>
            d.id === id
              ? {
                  ...d,
                  progress: realtimeData.progress,
                  status: realtimeData.status,
                  ...(realtimeData.data && {
                    title: realtimeData.data.title,
                    description: realtimeData.data.description,
                  }),
                }
              : d
          ),
        }
    );

    queryClient.setQueryData<DeckResponse>(deckKeys.detail(id), old =>
      old
        ? {
            ...old,
            data: {
              ...old.data,
              progress: realtimeData.progress,
              status: realtimeData.status,
              ...(realtimeData.data && {
                title: realtimeData.data.title,
                description: realtimeData.data.description,
              }),
            },
          }
        : undefined
    );

    queryClient.invalidateQueries({ queryKey: deckKeys.detail(id) });
  }, [id, realtimeData]);

  return { realtimeData, connectionStatus, runStatus, error, reset };
};

export const useCreateDeck = () =>
  useMutation({
    mutationFn: (data: CreateDeckData) => decks.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: deckKeys.lists() }),
  });

export const useDeleteDeck = () =>
  useMutation({
    mutationFn: (id: string) => decks.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: deckKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: deckKeys.lists() });
    },
  });

export const useDeleteDecks = () =>
  useMutation({
    mutationFn: () => decks.deleteAll(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: deckKeys.all }),
  });
