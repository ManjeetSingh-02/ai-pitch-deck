import { ThemeSelector } from '@/components/theme-selector';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
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
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { toast } from '@/components/ui/toast';
import { useDeleteDecks } from '@/hooks/use-deck';
import { authClient } from '@/lib/auth-client';
import { pageTitle } from '@/utils/title';
import { createFileRoute } from '@tanstack/react-router';
import { UserRound } from 'lucide-react';

export const Route = createFileRoute('/(app)/settings')({
  head: () => ({ meta: [{ title: pageTitle('Settings') }] }),
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
      <section className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center px-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">Manage your account, appearance, and decks</p>
        </div>

        <Card className="bg-transparent ring-0">
          <CardTitle>Account</CardTitle>

          <CardContent className="rounded-xl border p-0">
            <Item>
              <ItemMedia variant="icon">
                <Avatar>
                  <AvatarImage src={user.image ?? undefined} />
                  <AvatarFallback>
                    <UserRound />
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="min-w-0">
                <ItemTitle>{user.name}</ItemTitle>
                <ItemDescription className="truncate">{user.email}</ItemDescription>
              </ItemContent>
              <ItemActions>
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
              </ItemActions>
            </Item>
          </CardContent>
        </Card>

        <Card className="bg-transparent ring-0">
          <CardTitle>Appearance</CardTitle>

          <CardContent className="rounded-xl border p-0">
            <Item>
              <ItemContent>
                <ItemTitle>Theme</ItemTitle>
                <ItemDescription>Choose light, dark or system theme</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ThemeSelector />
              </ItemActions>
            </Item>
          </CardContent>
        </Card>

        <Card className="bg-transparent ring-0">
          <CardTitle>Decks</CardTitle>

          <CardContent className="rounded-xl border p-0">
            <Item>
              <ItemContent>
                <ItemTitle>Decks</ItemTitle>
                <ItemDescription>Delete all your decks and its data</ItemDescription>
              </ItemContent>
              <ItemActions>
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
              </ItemActions>
            </Item>
          </CardContent>
        </Card>
      </section>
    );
  },
});
