import { DeckProgress } from '@/components/deck-progress';
import { DeckStatus } from '@/components/deck-status';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useDeckRealtime } from '@/hooks/use-deck';
import type { DeckRealtimeData } from '@/types/decks';
import { useNavigate } from '@tanstack/react-router';

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
      className="bg-background hover:bg-card cursor-pointer transition-colors"
      onClick={() => {
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
            <DeckStatus status={status} />
          </CardAction>
        </div>
      </CardHeader>

      <CardContent>
        <DeckProgress
          progress={progress}
          status={status}
        />
      </CardContent>
    </Card>
  );
}
