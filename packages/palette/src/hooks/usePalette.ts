import useSWRImmutable from 'swr/immutable';

import StorageError from '../errors/StorageError';
import storage from '../storage';
import { PaletteInfoWithColors } from '../types';

const usePalette = (id: string) => {
  const { data, error, isValidating } = useSWRImmutable<
  PaletteInfoWithColors,
  Error | StorageError
  >(id ? ['palette', id] : undefined, () => storage.getFullPalette(id));

  return {
    data,
    error,
    isLoading: isValidating,
  };
};

export default usePalette;
