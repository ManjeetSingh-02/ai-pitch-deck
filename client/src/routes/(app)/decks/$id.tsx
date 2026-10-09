import { DeckView } from '@/components/deck-view';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/decks/$id')({
  component: function Deck() {
    const { id } = useParams({ from: '/(app)/decks/$id' });

    return (
      <section className="mx-auto flex min-h-full w-full max-w-6xl flex-col items-center justify-center gap-4 p-4">
        <DeckView id={id} />
      </section>
    );
  },
});
