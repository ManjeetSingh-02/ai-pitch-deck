import type { DeckRealtimeData } from '@/types/decks';
import { cn } from 'cn';
import { AlertCircle, CheckCircle, LoaderCircle } from 'lucide-react';

export function DeckStatus({ status }: { status: DeckRealtimeData['status'] }) {
  return status === 'ERROR' ? (
    <AlertCircle className="text-destructive" />
  ) : status === 'READY' ? (
    <CheckCircle className="text-green-500" />
  ) : (
    <LoaderCircle
      className={cn('animate-spin', status === 'GENERATING' ? 'text-yellow-500' : '')}
    />
  );
}
