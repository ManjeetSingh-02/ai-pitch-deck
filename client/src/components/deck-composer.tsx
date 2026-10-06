import { Field } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { toast } from '@/components/ui/toast';
import { useCreateDeck } from '@/hooks/use-deck';
import { Send } from 'lucide-react';
import { useState } from 'react';

export function DeckComposer() {
  const [prompt, setPrompt] = useState('');
  const useCreateDeckMutation = useCreateDeck();

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== 'Enter') return;

    if (!prompt.trim()) {
      e.preventDefault();
      return;
    }

    if (!e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    return useCreateDeckMutation.mutate(
      { prompt: prompt.trim() },
      {
        onError: error =>
          toast.add({
            title: error.message,
            type: 'error',
            timeout: 3000,
          }),
        onSuccess: () =>
          toast.add({
            title: 'Deck enqueued for generation',
            type: 'info',
            timeout: 3000,
          }),
        onSettled: () => setPrompt(''),
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field className="mx-auto w-full max-w-2xl shrink-0 px-4 pb-4">
        <InputGroup>
          <InputGroupTextarea
            id="prompt"
            name="prompt"
            minLength={30}
            maxLength={300}
            className="min-h-10"
            value={prompt}
            onKeyDown={handleKeyDown}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Type your prompt here..."
          />

          <InputGroupAddon align={prompt.trim() ? 'block-end' : 'inline-end'}>
            {prompt.trim() && <InputGroupText>{prompt.trim().length} / 300</InputGroupText>}
            <InputGroupButton
              type="submit"
              variant="default"
              className="ml-auto"
              size={prompt.trim() ? 'icon-sm' : 'icon-xs'}
              disabled={!prompt.trim()}
            >
              <Send
                data-icon="send"
                aria-hidden="true"
              />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </form>
  );
}
