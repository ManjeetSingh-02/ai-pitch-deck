import { ThemeSelector } from '@/components/theme-selector';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/toast';
import { useDeleteDecks } from '@/hooks/use-deck';
import { authClient } from '@/lib/auth-client';
import { createFileRoute } from '@tanstack/react-router';
import { UserRound } from 'lucide-react';

export const Route = createFileRoute('/(app)/settings')({
  loader: async ({ context }) => ({ user: context.user }),
  component: function Settings() {
    const { user } = Route.useLoaderData();
    const deleteDecksMutation = useDeleteDecks();

    function deleteDecks() {
      return deleteDecksMutation.mutate(undefined, {
        onSuccess: () =>
          toast.add({
            title: 'Decks deleted',
            type: 'success',
            timeout: 3000,
          }),
        onError: error =>
          toast.add({
            title: error.message,
            type: 'error',
            timeout: 3000,
          }),
      });
    }

    async function deleteAccount() {
      try {
        await authClient.deleteUser();

        toast.add({
          title: 'Account deleted',
          type: 'success',
          timeout: 3000,
        });
      } catch {
        toast.add({
          title: 'Failed to delete account',
          type: 'error',
          timeout: 3000,
        });
      }
    }

    return (
      <section className="flex w-full max-w-3xl flex-col gap-8 px-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">Manage your account, appearance, and decks</p>
        </div>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold">Account</h2>
            <p className="text-muted-foreground text-sm">Your personal account information</p>
          </div>

          <div className="bg-card overflow-hidden rounded-xl border">
            <div className="flex items-center justify-between p-5">
              <div className="flex min-w-0 items-center gap-4">
                <Avatar>
                  <AvatarImage src={user.image ?? undefined} />
                  <AvatarFallback>
                    <UserRound />
                  </AvatarFallback>
                </Avatar>

                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-muted-foreground truncate text-sm">{user.email}</p>
                </div>
              </div>

              <Dialog>
                <DialogTrigger render={<Button variant="destructive">Delete</Button>} />

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete your account?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone and will permanently delete your account.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <DialogClose render={<Button variant="outline">Cancel</Button>} />
                    <DialogClose
                      render={
                        <Button
                          variant="destructive"
                          onClick={deleteAccount}
                        >
                          Delete
                        </Button>
                      }
                    />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold">Preferences</h2>
            <p className="text-muted-foreground text-sm">Customize your app experience</p>
          </div>

          <div className="bg-card overflow-hidden rounded-xl border">
            <div className="flex items-center justify-between p-5">
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="font-medium">Theme</p>
                <p className="text-muted-foreground text-sm">
                  Choose light, dark or system theme for the app
                </p>
              </div>

              <ThemeSelector />
            </div>

            <Separator />

            <div className="flex items-center justify-between p-5">
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="font-medium">Decks</p>
                <p className="text-muted-foreground text-sm">Delete all your decks and its data</p>
              </div>

              <Dialog>
                <DialogTrigger render={<Button variant="destructive">Delete</Button>} />

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete your decks?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone and will permanently delete all your decks.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <DialogClose render={<Button variant="outline">Cancel</Button>} />
                    <DialogClose
                      render={
                        <Button
                          variant="destructive"
                          onClick={deleteDecks}
                        >
                          Delete
                        </Button>
                      }
                    />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
      </section>
    );
  },
});
