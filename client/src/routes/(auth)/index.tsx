import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/')({
  beforeLoad: async ({ context }) => {
    if (context.session) throw redirect({ to: '/decks' });
  },
  component: () => <div>Hi auth</div>,
});
