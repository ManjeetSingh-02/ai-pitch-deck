import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { toast } from '@/components/ui/toast';
import { authClient } from '@/lib/auth-client';
import { Link, useRouterState } from '@tanstack/react-router';
import { cn } from 'cn';
import { Home, LogOut, Settings, WandSparkles } from 'lucide-react';

export function Navbar() {
  const { data } = authClient.useSession();
  const pathname = useRouterState({ select: state => state.location.pathname });
  const items = [
    { label: 'Decks', to: '/decks', icon: Home },
    { label: 'Settings', to: '/settings', icon: Settings },
  ];

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
    <nav
      className={cn(
        'mx-auto flex w-full max-w-6xl shrink-0 items-center p-3',
        data?.user ? 'bg-background justify-between' : 'justify-center'
      )}
    >
      <div className="hidden items-center gap-2 text-lg font-semibold tracking-tight sm:flex">
        <WandSparkles
          data-icon="inline-start"
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
                    data-icon="inline-start"
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </Link>
              }
            />
          ))}
        </ButtonGroup>
      )}

      {data?.user && (
        <Button
          variant="destructive"
          onClick={logoutUser}
        >
          <LogOut
            data-icon="inline-start"
            aria-hidden="true"
          />
          <span>LogOut</span>
        </Button>
      )}
    </nav>
  );
}
