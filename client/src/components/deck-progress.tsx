import { Progress } from '@/components/ui/progress';
import type { DeckRealtimeData } from '@/types/decks';

export function DeckProgress({
  status,
  progress,
}: {
  status: DeckRealtimeData['status'];
  progress: DeckRealtimeData['progress'];
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-muted-foreground flex items-center justify-between text-xs">
        <span>{status}</span>
        <span>{progress}%</span>
      </div>

      <Progress value={progress} />
    </div>
  );
}
