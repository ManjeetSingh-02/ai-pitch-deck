import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)')({
  beforeLoad: async ({ context }) => {
    if (!context.session) throw redirect({ to: '/' });
    return {
      user: {
        image: context.session.user.image,
        name: context.session.user.name,
        email: context.session.user.email,
      },
    };
  },
  component: Outlet,
});
