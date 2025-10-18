import type { Language, FrameStyle } from './types';

export const LANGUAGES: Language[] = ['English', 'Urdu', 'Roman Urdu'];

export const DEFAULT_STYLES: FrameStyle = {
  backgroundColor: '#ffffff', // White
  textColor: '#0f172a',       // Slate 900 (dark blueish-gray)
  fontSize: 28,
  captionFontSize: 16,
};

export const MIN_FONT_SIZE = 12;
export const MAX_FONT_SIZE = 64;

export const MIN_CAPTION_FONT_SIZE = 8;
export const MAX_CAPTION_FONT_SIZE = 32;