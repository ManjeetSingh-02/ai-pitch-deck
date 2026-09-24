// internal-imports
import { env } from '../config/env.js';

// external-imports
import ImageKit from '@imagekit/nodejs';

// create an instance of ImageKit
export const imageKit = new ImageKit({ privateKey: env.IMAGEKIT_PRIVATE_KEY });
