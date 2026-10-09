import { DeckProgress } from '@/components/deck-progress';
import { DeckStatus } from '@/components/deck-status';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
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
import { NotFound } from '@/components/not-found';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { toast } from '@/components/ui/toast';
import { useDeck, useDeckRealtime, useDeleteDeck } from '@/hooks/use-deck';
import { useEffect, useState } from 'react';
import { ArrowLeft, LoaderCircle, Trash } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function DeckView({ id }: { id: string }) {
  const { data, error, isError, isLoading } = useDeck(id);
  const { realtimeData } = useDeckRealtime(id);
  const deleteDeckMutation = useDeleteDeck();
  const navigate = useNavigate();
  const [isDeletingDeck, setIsDeletingDeck] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [selectedSlide, setSelectedSlide] = useState(0);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => setSelectedSlide(api.selectedScrollSnap());
    handleSelect();
    api.on('select', handleSelect);

    return () => {
      api.off('select', handleSelect);
    };
  }, [api]);

  async function deleteDeck() {
    setIsDeletingDeck(true);

    return deleteDeckMutation.mutate(id, {
      onSuccess: () => {
        toast.add({
          title: 'Deck deleted',
          type: 'success',
          timeout: 3000,
        });

        navigate({ to: '/decks' });
      },
      onError: error =>
        toast.add({
          title: error.message,
          type: 'error',
          timeout: 3000,
        }),
      onSettled: () => setIsDeletingDeck(false),
    });
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center">
        {isLoading ? (
          <Spinner className="size-6" />
        ) : isError ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <p>Deck Error</p>
            <p className="text-muted-foreground text-center text-sm">
              {error?.message ?? 'Something went wrong while fetching the deck.'}
            </p>
          </div>
        ) : (
          <NotFound type="Deck" />
        )}
      </div>
    );
  }

  const status = realtimeData?.status ?? data.status;
  const progress = realtimeData?.progress ?? data.progress;
  const slides = data.slides.slice().sort((a, b) => a.order - b.order);
  const activeSlide = slides[selectedSlide];

  return (
    <Card className="w-full overflow-visible bg-transparent ring-0">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={() => navigate({ to: '/decks' })}
          >
            <ArrowLeft />
          </Button>

          <div className="flex flex-col gap-1">
            <CardTitle className="text-2xl">{data.title}</CardTitle>
            <CardDescription className="text-sm">{data.description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {slides.length > 0 ? (
          <Carousel
            className="mx-auto w-full max-w-4xl px-8 sm:px-14"
            opts={{ align: 'start' }}
            setApi={setApi}
          >
            <CarouselContent>
              {slides.map(slide => (
                <CarouselItem key={slide.id}>
                  <div className="bg-background flex aspect-square w-full items-center justify-center overflow-hidden">
                    {slide.imageUrl ? (
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        width={1024}
                        height={1024}
                        className="size-full object-contain"
                      />
                    ) : (
                      <div className="text-muted-foreground flex flex-col items-center gap-3 text-sm">
                        <Spinner className="size-6" />
                        <span>Preparing slide image</span>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="bg-background text-muted-foreground flex aspect-square w-full items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <Spinner className="size-6" />
              <p className="text-muted-foreground text-sm">Slides are being generated...</p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="bg-background flex flex-col gap-4">
        {activeSlide ? (
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
                  Slide {String(activeSlide.order).padStart(2, '0')}
                </span>
                <span className="bg-border h-4 w-px" />
                <p className="truncate font-medium">{activeSlide.title}</p>
              </div>
              <span className="text-muted-foreground shrink-0 text-sm tabular-nums">
                {selectedSlide + 1} / {slides.length}
              </span>
            </div>
            <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">
              {activeSlide.content}
            </p>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-1">
            <span className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
              Prompt
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed">{data.prompt}</p>
          </div>
        )}

        <Separator />

        <div className="flex w-full items-center justify-between gap-4">
          <DeckStatus status={status} />

          <DeckProgress
            progress={progress}
            status={status}
          />

          <Dialog>
            <DialogTrigger
              render={
                <Button
                  variant="destructive"
                  size="icon"
                  disabled={isDeletingDeck}
                >
                  {isDeletingDeck ? <LoaderCircle className="animate-spin" /> : <Trash />}
                </Button>
              }
            />

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete this deck?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone and will permanently delete this deck.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose render={<Button variant="outline">Cancel</Button>} />
                <DialogClose
                  render={
                    <Button
                      variant="destructive"
                      onClick={deleteDeck}
                      disabled={isDeletingDeck}
                    >
                      Delete
                    </Button>
                  }
                />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}
