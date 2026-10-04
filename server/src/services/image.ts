// internal-imports
import { imageKit } from '@/core/index.js';

// external-imports
import { toFile } from '@imagekit/nodejs';

// function to upload image
export async function uploadImage(
  buffer: Buffer,
  userId: string,
  deckId: string,
  fileName: string
) {
  const { url } = await imageKit.files.upload({
    file: await toFile(buffer, fileName),
    fileName,
    folder: `/pitch-decks/${userId}/${deckId}`,
  });
  if (!url) throw new Error('Image upload failed');

  return { url };
}
