import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { Link } from '@tanstack/react-router';
import { Settings, WandSparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export function Navbar() {
  const { data } = authClient.useSession();

  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between p-3">
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

      <div className="flex items-center gap-2">
        {data?.user && (
          <Button
            nativeButton={false}
            variant="ghost"
            render={
              <Link to="/settings">
                <Settings
                  data-icon="inline-start"
                  aria-hidden="true"
                />
                <span className="hidden sm:inline-block">Settings</span>
              </Link>
            }
          />
        )}

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
          <FaGithub
            data-icon="inline-start"
            aria-hidden="true"
          />
          <span className="hidden sm:inline-block">GitHub</span>
        </Button>
      </div>
    </nav>
  );
}
