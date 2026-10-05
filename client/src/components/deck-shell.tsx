import { Card } from '@/components/ui/card';
import { useDecks } from '@/hooks/use-deck';

export function DeckShell() {
  const { data, error, isError, isLoading } = useDecks();

  return (
    <div className="mx-auto w-full max-w-6xl p-4">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center">
          <p>Error: {error?.message}</p>
        </div>
      ) : data?.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map(deck => (
            <Card key={deck.id}>
              <h2 className="text-lg font-semibold">{deck.title}</h2>
              <p className="text-sm text-gray-500">{deck.description}</p>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p>No decks found.</p>
        </div>
      )}
    </div>
  );
}
