import { Navbar } from '@/components/navbar';
import { NotFound } from '@/components/not-found';
import { ScrollArea } from '@/components/ui/scroll-area';
import { authClient } from '@/lib/auth-client';
import { pageTitle } from '@/utils/title';
import { createRootRouteWithContext, HeadContent, Outlet } from '@tanstack/react-router';

type RouterContext = {
  session: Awaited<ReturnType<typeof authClient.useSession>>['data'];
};

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({ meta: [{ title: pageTitle() }] }),
  component: () => (
    <>
      <HeadContent />

      <div className="bg-background flex h-dvh flex-col overflow-hidden">
        <Navbar />

        <ScrollArea className="min-h-0 flex-1">
          <Outlet />
        </ScrollArea>
      </div>
    </>
  ),
  notFoundComponent: () => <NotFound type="Page" />,
});
