type ErrorStatus = 'duplicate-entry' | 'not-found';

class StorageError extends Error {
  readonly status: ErrorStatus | undefined;

  constructor(message: string, status?: ErrorStatus) {
    super(message);
    this.status = status;
    this.name = 'StorageError';
  }
}

export default StorageError;
