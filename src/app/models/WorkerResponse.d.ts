export interface Worker {
  success: boolean;
  response: WorkerResponseEntity;
}

export interface WorkerResponseEntity {
  killed: boolean;
  error?: string;
}
