import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { toast } from '@/components/ui/toast';
import { authClient } from '@/lib/auth-client';
import { Link, useRouterState } from '@tanstack/react-router';
import { LoaderCircle, LogOut, Presentation, Settings, WandSparkles } from 'lucide-react';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

export function Navbar() {
  const { data } = authClient.useSession();
  const pathname = useRouterState({ select: state => state.location.pathname });
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const items = [
    { label: 'Decks', to: '/decks', icon: Presentation },
    { label: 'Settings', to: '/settings', icon: Settings },
  ];

  async function logoutUser() {
    try {
      setIsLoggingOut(true);
      await authClient.signOut();

      toast.add({
        title: 'Logged out successfully',
        type: 'success',
        timeout: 3000,
      });
    } catch {
      toast.add({
        title: 'Failed to log out',
        type: 'error',
        timeout: 3000,
      });
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <nav className="bg-background mx-auto flex w-full max-w-6xl shrink-0 items-center justify-between p-3">
      <div className="hidden items-center gap-2 text-lg font-semibold tracking-tight sm:flex">
        <WandSparkles
          data-icon="wand-sparkles"
          aria-hidden="true"
        />
        <span>AI Pitch Deck</span>
      </div>

      {data?.user && (
        <ButtonGroup className="bg-muted rounded-lg">
          {items.map(item => (
            <Button
              key={item.label}
              variant={pathname === item.to ? 'default' : 'ghost'}
              nativeButton={false}
              render={
                <Link to={item.to}>
                  <item.icon
                    data-icon={item.label.toLowerCase()}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </Link>
              }
            />
          ))}
        </ButtonGroup>
      )}

      <div className="flex items-center gap-1">
        {data?.user && (
          <Button
            variant="destructive"
            onClick={logoutUser}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <LoaderCircle
                data-icon="logout"
                aria-hidden="true"
                className="animate-spin"
              />
            ) : (
              <LogOut
                data-icon="logout"
                aria-hidden="true"
              />
            )}
            <span>LogOut</span>
          </Button>
        )}

        <Button
          nativeButton={false}
          variant="ghost"
          render={
            <a
              href="https://github.com/ManjeetSingh-02/ai-pitch-deck"
              target="_blank"
              rel="noreferrer"
            />
          }
        >
          <FaGithub
            data-icon="github"
            aria-hidden="true"
          />
          <span className="hidden sm:flex">GitHub</span>
        </Button>
      </div>
    </nav>
  );
}
