import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/decks/$id')({
  component: () => <div>Hello "/(app)/decks/$id"!</div>,
});
