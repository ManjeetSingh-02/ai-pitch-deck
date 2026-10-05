import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { authClient } from '@/lib/auth-client';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { WandSparkles } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

export const Route = createFileRoute('/(auth)/')({
  beforeLoad: async ({ context }) => {
    if (context.session) throw redirect({ to: '/decks' });
  },
  component: () => {
    async function handleGoogleSignIn() {
      try {
        await authClient.signIn.social({
          provider: 'google',
          callbackURL: window.location.origin,
        });
      } catch {
        toast.add({
          title: 'Failed to sign in',
          type: 'error',
          timeout: 3000,
        });
      }
    }

    return (
      <section className="flex min-h-full flex-col items-center justify-center gap-4 px-4 text-center">
        <WandSparkles
          data-icon="wand-sparkles"
          aria-hidden="true"
        />
        <p className="text-muted-foreground text-sm font-semibold tracking-[0.2em] uppercase">
          Welcome to Pitch Deck
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Create your pitch deck</h1>
        <p className="text-muted-foreground max-w-sm">
          Sign in or create an account to start building your pitch decks.
        </p>
        <Button
          onClick={handleGoogleSignIn}
          size="lg"
        >
          <FaGoogle />
          <span>Continue with Google</span>
        </Button>
      </section>
    );
  },
});
