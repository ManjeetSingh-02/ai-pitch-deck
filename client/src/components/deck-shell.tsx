import { DeckPreview } from '@/components/deck-preview';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';
import { useDecks } from '@/hooks/use-deck';
import { Presentation } from 'lucide-react';

export function DeckShell() {
  const { data, error, isError, isLoading } = useDecks();

  if (!data?.length) {
    return (
      <div className="mx-auto flex min-h-full w-full max-w-6xl items-center justify-center p-4">
        {isLoading ? (
          <Spinner className="size-6" />
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Presentation />
              </EmptyMedia>

              <EmptyTitle>No Decks</EmptyTitle>

              <EmptyDescription>
                {isError
                  ? (error?.message ?? 'Something went wrong while fetching the decks.')
                  : 'You have no decks yet. Create a new deck by entering the prompt in the composer.'}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.map(deck => (
          <DeckPreview
            key={deck.id}
            deck={deck}
          />
        ))}
      </div>
    </div>
  );
}
