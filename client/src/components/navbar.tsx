import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { ExternalLinkIcon, WandSparkles } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="mx-auto flex w-full max-w-4xl items-center justify-between p-3">
      <Link
        to="/"
        className="flex items-center gap-2 text-lg font-semibold tracking-tight"
      >
        <WandSparkles
          data-icon="inline-start"
          aria-hidden="true"
        />
        AI Pitch Deck
      </Link>

      <Button
        nativeButton={false}
        variant="outline"
        render={
          <a
            href="https://github.com/ManjeetSingh-02/ai-pitch-deck"
            target="_blank"
            rel="noreferrer"
          />
        }
      >
        <ExternalLinkIcon
          data-icon="inline-start"
          aria-hidden="true"
        />
        GitHub
      </Button>
    </nav>
  );
}
