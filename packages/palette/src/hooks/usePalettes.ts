import useSWRImmutable from 'swr/immutable';

import StorageError from '../errors/StorageError';
import storage from '../storage';
import { PaletteInfoWithColors } from '../types';

const makePaletteTimestampName = () => {
  const date = new Date();

  const year = date
    .getFullYear()
    .toString()
    .slice(2, 4);
  const month = date.getMonth();
  const day = date.getDay();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();

  return `Palette - ${day}/${month}/${year} ${hour}:${minute}:${seconds}`;
};

const usePalettes = () => {
  const { data, isValidating, mutate } = useSWRImmutable<
  PaletteInfoWithColors[],
  Error | StorageError
  >('palettes', storage.getPaletteInfoWithColors);

  const createPalette = () => {
    const palette = storage.createPalette({
      name: makePaletteTimestampName(),
      colors: {},
    });

    mutate();

    return palette;
  };

  return {
    data,
    isLoading: isValidating,
    refresh: mutate,
    handlers: {
      createPalette,
    },
  };
};

export default usePalettes;
