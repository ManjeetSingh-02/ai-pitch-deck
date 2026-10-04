import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { NotFound } from '@/components/not-found';
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

      <div className="bg-background flex min-h-dvh flex-col">
        <header className="sticky top-0 shrink-0">
          <Navbar />
        </header>

        <main className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto py-8">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  ),
  notFoundComponent: NotFound,
});
