import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/decks/')({
  component: () => <div>Hello "/(app)/decks/"!</div>,
});
