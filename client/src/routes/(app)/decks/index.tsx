import { DeckComposer } from '@/components/deck-composer';
import { DeckShell } from '@/components/deck-shell';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/decks/')({
  component: () => (
    <section className="flex h-full min-h-0 flex-col gap-4">
      <ScrollArea className="min-h-0 flex-1">
        <DeckShell />
      </ScrollArea>

      <DeckComposer />
    </section>
  ),
});
