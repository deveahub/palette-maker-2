import { nanoid } from 'nanoid';

import StorageError from './errors/StorageError';
import {
  PaletteColors,
  PaletteInfoWithColors,
  PaletteInfo,
  Palettes,
} from './types';

const PALETTES_KEY = 'palettes';

const PALETTE_KEY_PREFIX = 'palette-';

export const makePaletteKey = (id: string) => `${PALETTE_KEY_PREFIX}${id}`;

const getPaletteColors = (id: string) => {
  const stored = localStorage.getItem(makePaletteKey(id));

  if (!stored) throw new StorageError(`Not found palette ${id}`, 'not-found');

  return JSON.parse(stored) as PaletteColors;
};

const getPalettesInfo = () => {
  const stored = window.localStorage.getItem(PALETTES_KEY);
  return stored ? (JSON.parse(stored) as Palettes) : [];
};

const getPaletteInfoWithColors = (): Array<PaletteInfoWithColors> => {
  const paletteInfo = getPalettesInfo();

  return paletteInfo.map((palette) => ({
    ...palette,
    ...getPaletteColors(palette.id),
  }));
};

const getPaletteInfoById = (id: string) => {
  const palette = getPalettesInfo().find((paletteInfo) => paletteInfo.id === id);

  if (!palette) throw new StorageError(`Not found palette ${id}`, 'not-found');

  return palette as PaletteInfo;
};

const setPaletteInfo = (paletteInfo: PaletteInfo) => {
  const palettes = getPalettesInfo();
  const existsName = palettes.find(
    (x) => x.name.trim().toUpperCase() === paletteInfo.name.trim().toUpperCase()
  );

  if (existsName) {
    throw new StorageError('Name already exists', 'duplicate-entry');
  }

  localStorage.setItem(
    PALETTES_KEY,
    JSON.stringify([paletteInfo, ...palettes])
  );
};

const setPalettes = (palettes: Palettes) => {
  localStorage.setItem(PALETTES_KEY, JSON.stringify(palettes));
};

const deletePaletteInfo = (id: string) => {
  const palettes = getPalettesInfo();

  const fildteredPalettes = palettes.filter((x) => x.id === id);

  if (palettes.length === fildteredPalettes.length) return false;

  setPalettes(fildteredPalettes);
  return true;
};

const createPalette = ({ name, colors }: Omit<PaletteInfoWithColors, 'id'>) => {
  const id = nanoid();

  setPaletteInfo({ id, name });

  const newPalette = { id, colors } as PaletteColors;

  localStorage.setItem(makePaletteKey(id), JSON.stringify(newPalette));

  return newPalette;
};

const deletePalette = (id: string) => {
  if (!deletePaletteInfo(id)) return false;

  localStorage.removeItem(makePaletteKey(id));

  return true;
};

const getFullPalette = (id: string) => ({
  ...getPaletteInfoById(id),
  ...getPaletteColors(id),
});

const storage = {
  getPalettesInfo,
  getPaletteInfoById,
  getPaletteInfoWithColors,
  setPaletteInfo,
  setPalettes,
  deletePaletteInfo,
  getPaletteColors,
  createPalette,
  getFullPalette,
  deletePalette,
};

export default storage;
