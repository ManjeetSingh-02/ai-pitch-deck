import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { AlertTriangle, Home } from 'lucide-react';

export function NotFound({ type }: { type: 'Deck' | 'Page' }) {
  return (
    <section className="flex min-h-full flex-col items-center justify-center gap-4 px-4 text-center">
      <AlertTriangle
        data-icon="alert-triangle"
        aria-hidden="true"
      />
      <p className="text-muted-foreground text-sm font-semibold tracking-[0.2em] uppercase">
        Welcome to Pitch Deck
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">404 - {type} Not Found</h1>
      <p className="text-muted-foreground max-w-sm">
        The {type.toLowerCase()} you are looking for doesn't exist. Please check the URL or return
        to the home page.
      </p>
      <Link to="/">
        <Button size="lg">
          <Home />
          <span>Back to Home</span>
        </Button>
      </Link>
    </section>
  );
}
