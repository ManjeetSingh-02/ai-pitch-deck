import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { AlertTriangle, Home } from 'lucide-react';

export function NotFound() {
  return (
    <section className="flex flex-col items-center gap-4 text-center">
      <AlertTriangle
        data-icon="inline-start"
        aria-hidden="true"
      />
      <p className="text-muted-foreground text-sm font-semibold tracking-[0.2em] uppercase">
        Welcome to Pitch Deck
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">404 - Page Not Found</h1>
      <p className="text-muted-foreground max-w-sm">
        The page you are looking for does not exist or may have moved.
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
