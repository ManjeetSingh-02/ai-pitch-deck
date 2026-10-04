import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="text-muted-foreground mx-auto flex w-full max-w-6xl shrink-0 items-center justify-between p-3 text-sm">
      <div className="flex items-center">
        <span>Designed & developed by</span>
        <Button
          nativeButton={false}
          variant="link"
          className="px-1"
          render={
            <a
              href="https://github.com/ManjeetSingh-02"
              target="_blank"
              rel="noreferrer"
            />
          }
        >
          Manjeet Singh
        </Button>
      </div>

      <Button
        nativeButton={false}
        variant="link"
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
    </footer>
  );
}
