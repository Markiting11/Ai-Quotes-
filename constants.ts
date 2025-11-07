import type { Language, FrameStyle, StylePreset, FontPairing, FrameDesign } from './types';

export const LANGUAGES: Language[] = ['English', 'Urdu', 'Roman Urdu'];
export const FONT_PAIRINGS: FontPairing[] = ['Serif', 'Sans-Serif', 'Script'];
export const FRAME_DESIGNS: FrameDesign[] = ['Classic 3D', 'Minimalist Shadow', 'Floating Glass', 'Elegant Border'];

export const DEFAULT_STYLES: FrameStyle = {
  backgroundColor: '#ffffff', // White
  textColor: '#0f172a',       // Slate 900 (dark blueish-gray)
  fontSize: 28,
  captionFontSize: 16,
  fontPairing: 'Serif',
  frameDesign: 'Classic 3D',
};

export const MIN_FONT_SIZE = 12;
export const MAX_FONT_SIZE = 64;

export const MIN_CAPTION_FONT_SIZE = 8;
export const MAX_CAPTION_FONT_SIZE = 32;

export const STYLE_PRESETS: StylePreset[] = [
  {
    name: 'Modern Dark',
    backgroundColor: '#1a202c',
    textColor: '#edf2f7',
    fontSize: 26,
    captionFontSize: 14,
    fontPairing: 'Sans-Serif',
    frameDesign: 'Minimalist Shadow',
  },
  {
    name: 'Elegant Light',
    backgroundColor: '#fdfbfb',
    textColor: '#333333',
    fontSize: 30,
    captionFontSize: 16,
    fontPairing: 'Serif',
    frameDesign: 'Classic 3D',
  },
  {
    name: 'Ocean Breeze',
    backgroundColor: '#00796b', // Darker background for glass effect
    textColor: '#ffffff',
    fontSize: 28,
    captionFontSize: 15,
    fontPairing: 'Sans-Serif',
    frameDesign: 'Floating Glass',
  },
  {
    name: 'Sunset Glow',
    backgroundColor: '#fff8e1',
    textColor: '#d84315',
    fontSize: 28,
    captionFontSize: 16,
    fontPairing: 'Serif',
    frameDesign: 'Elegant Border',
  },
    {
    name: 'Rose Quartz',
    backgroundColor: '#fbe2e3',
    textColor: '#883e7a',
    fontSize: 32,
    captionFontSize: 17,
    fontPairing: 'Script',
    frameDesign: 'Elegant Border',
  },
  {
    name: 'Pastel Dream',
    backgroundColor: '#f3e8ff',
    textColor: '#6b46c1',
    fontSize: 28,
    captionFontSize: 15,
    fontPairing: 'Script',
    frameDesign: 'Classic 3D',
  },
  {
    name: 'Bold Contrast',
    backgroundColor: '#111827',
    textColor: '#bef264',
    fontSize: 32,
    captionFontSize: 18,
    fontPairing: 'Sans-Serif',
    frameDesign: 'Minimalist Shadow',
  },
];
