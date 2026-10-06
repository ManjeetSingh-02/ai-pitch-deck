import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useDeckRealtime } from '@/hooks/use-deck';
import type { DeckRealtimeData } from '@/types/decks';
import { useNavigate } from '@tanstack/react-router';
import { cn } from 'cn';
import { AlertCircle, CheckCircle, LoaderCircle } from 'lucide-react';

type DeckType = Pick<DeckRealtimeData, 'status' | 'progress'> & {
  id: string;
  title: string;
  description: string | null;
};

export function DeckPreview({ deck }: { deck: DeckType }) {
  const navigate = useNavigate();
  const { realtimeData } = useDeckRealtime(deck.id);
  const progress = realtimeData?.progress ?? deck.progress;
  const status = realtimeData?.status ?? deck.status;
  const title = realtimeData?.data?.title ?? deck.title;
  const description = realtimeData?.data?.description ?? deck.description;

  return (
    <Card
      className={cn(
        'bg-background',
        deck.status === 'READY' || deck.status === 'ERROR'
          ? 'hover:bg-card cursor-pointer transition-colors'
          : 'cursor-not-allowed'
      )}
      onClick={() => {
        if (deck.status === 'READY' || deck.status === 'ERROR')
          navigate({
            to: '/decks/$id',
            params: { id: deck.id },
          });
      }}
    >
      <CardHeader>
        <div className="min-w-0">
          <CardTitle className="line-clamp-1">{title}</CardTitle>
          <CardDescription className="mt-1 line-clamp-2">{description}</CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <CardAction>
            {status === 'ERROR' ? (
              <AlertCircle className="text-destructive" />
            ) : status === 'READY' ? (
              <CheckCircle className="text-green-500" />
            ) : (
              <LoaderCircle
                className={cn('animate-spin', status === 'GENERATING' ? 'text-yellow-500' : '')}
              />
            )}
          </CardAction>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <span>{status}</span>
            <span>{progress}%</span>
          </div>

          <Progress value={progress} />
        </div>
      </CardContent>
    </Card>
  );
}
