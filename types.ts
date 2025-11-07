export type Language = 'English' | 'Urdu' | 'Roman Urdu';
export type FontPairing = 'Serif' | 'Sans-Serif' | 'Script';
export type FrameDesign = 'Classic 3D' | 'Minimalist Shadow' | 'Floating Glass' | 'Elegant Border';

export interface FrameStyle {
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  captionFontSize: number;
  fontPairing: FontPairing;
  frameDesign: FrameDesign;
}

export interface StylePreset extends FrameStyle {
  name: string;
}
