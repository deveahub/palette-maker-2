type ModVariantDark = `d-${number}`;
type ModVariantLight = `l-${number}`;
type ModVariantAlpha = `a-${number}`;

interface VariantModifier {
  type: 'mod',
  value: ModVariantDark | ModVariantLight | ModVariantAlpha;
}

interface VariantStaticColor {
  type: 'color',
  value: string;
}

export type PaletteColorVariants = Record<string, VariantModifier | VariantStaticColor>;

export interface PaletteColors {
  id: string;
  colors: Record<string, string>;
}

export interface PaletteInfo {
  id: string;
  name: string;
}

export type Palettes = Array<PaletteInfo>;

export type PaletteInfoWithColors = PaletteInfo & PaletteColors;
