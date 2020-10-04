export interface Webhook {
  success: boolean;
  response?: (ResponseEntity)[] | ResponseEntity | null;
}
export interface ResponseEntity {
  _id: string;
  name: string;
  url: string;
  __v: number;
}

export interface WebhookDelete {
  success: boolean;
  response: Response;
}
export interface Response {
  deleted: string;
  db: Db;
}
export interface Db {
  n: number;
  ok: number;
  deletedCount: number;
}
