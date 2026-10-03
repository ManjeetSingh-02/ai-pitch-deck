import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { toast } from '@/components/ui/toast';
import { authClient } from '@/lib/auth-client';
import { Link } from '@tanstack/react-router';
import { LogOut, Settings, WandSparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export function Navbar() {
  const { data } = authClient.useSession();

  async function logoutUser() {
    try {
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
    }
  }

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

      <div className="flex items-center gap-1">
        {data?.user && (
          <ButtonGroup>
            <Button
              nativeButton={false}
              variant="secondary"
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

            <Button
              className="flex items-center"
              variant="destructive"
              onClick={logoutUser}
            >
              <LogOut
                data-icon="inline-start"
                aria-hidden="true"
              />
              <span className="hidden sm:inline-block">LogOut</span>
            </Button>
          </ButtonGroup>
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
            data-icon="inline-start"
            aria-hidden="true"
          />
          <span className="hidden sm:inline-block">GitHub</span>
        </Button>
      </div>
    </nav>
  );
}
