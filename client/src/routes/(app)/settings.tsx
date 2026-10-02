import { toast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { useDeleteDecks } from '@/hooks/use-deck';
import { authClient } from '@/lib/auth-client';
import { createFileRoute } from '@tanstack/react-router';
import { Edit, LogOut, Trash, UserRound } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
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
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ThemeSelector } from '@/components/theme-selector';

export const Route = createFileRoute('/(app)/settings')({
  loader: async ({ context }) => ({ user: context.user }),
  component: function Settings() {
    const { user } = Route.useLoaderData();
    const [name, setName] = useState(user.name);
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

    async function updateUserName() {
      try {
        await authClient.updateUser({ name });

        toast.add({
          title: 'Name updated',
          type: 'success',
          timeout: 3000,
        });
      } catch {
        toast.add({
          title: 'Failed to update name',
          type: 'error',
          timeout: 3000,
        });
      }
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
                <DialogTrigger
                  render={
                    <Button
                      className="flex items-center"
                      variant="outline"
                    >
                      <Edit />
                      Edit name
                    </Button>
                  }
                />

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Name</DialogTitle>
                    <DialogDescription>Enter a new name for your account</DialogDescription>
                  </DialogHeader>

                  <Field>
                    <Input
                      id="name"
                      name="name"
                      maxLength={20}
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Field>

                  <DialogFooter>
                    <DialogClose render={<Button variant="outline">Cancel</Button>} />

                    <DialogClose
                      render={
                        <Button
                          disabled={name.trim().length === 0 || name === user.name}
                          onClick={updateUserName}
                        >
                          Rename
                        </Button>
                      }
                    />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Separator />

            <div className="flex items-center justify-between p-5">
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="font-medium">Log out</p>
                <p className="text-muted-foreground text-sm">
                  Sign out of your account on this device
                </p>
              </div>

              <Button
                className="flex items-center"
                variant="outline"
                onClick={logoutUser}
              >
                <LogOut />
                <span>Log out</span>
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between p-5">
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="font-medium">Delete account</p>
                <p className="text-muted-foreground text-sm">
                  Permanently delete your account and all associated data
                </p>
              </div>

              <Button
                className="flex items-center"
                variant="destructive"
                onClick={deleteAccount}
              >
                <Trash />
                <span>Delete account</span>
              </Button>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold">Preferences</h2>
            <p className="text-muted-foreground text-sm">
              Customize your app experience and manage your decks
            </p>
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
                <p className="font-medium">Delete all decks</p>
                <p className="text-muted-foreground text-sm">
                  Permanently delete all your decks and it's associated data
                </p>
              </div>

              <Button
                className="flex items-center"
                variant="destructive"
                onClick={deleteDecks}
              >
                <Trash />
                <span>Delete all decks</span>
              </Button>
            </div>
          </div>
        </section>
      </section>
    );
  },
});
