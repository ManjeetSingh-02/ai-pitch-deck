import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import type { DeckRealtimeData } from '@/types/decks';

export function DeckProgress({
  status,
  progress,
}: {
  status: DeckRealtimeData['status'];
  progress: DeckRealtimeData['progress'];
}) {
  return (
    <Progress
      value={progress}
      className="w-full"
    >
      <ProgressLabel className="text-muted-foreground">{status}</ProgressLabel>
      <ProgressValue />
    </Progress>
  );
}
