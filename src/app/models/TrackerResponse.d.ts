export interface Tracker {
  success: boolean;
  response?: (ResponseEntity)[] | null;
}
export interface ResponseEntity {
  groups?: (string)[] | null;
  qqGroups?: (string | null)[] | null;
  _id: string;
  uid: string;
  displayName: string;
  nickname: string;
  __v: number;
}

export interface TrackerDelete {
  success: boolean;
  response: Response;
}
export interface Response {
  n: number;
  ok: number;
  deletedCount: number;
}

export interface NewTracker {
  success: boolean;
  response: NewTrackerResponse;
}
export interface NewTrackerResponse {
  groups?: (string)[] | null;
  qqGroups?: (string)[] | null;
  _id: string;
  uid: string;
  displayName: string;
  nickname: string;
  __v: number;
}
