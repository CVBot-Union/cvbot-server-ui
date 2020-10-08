export interface Tracker {
  success: boolean;
  response?: (ResponseEntity)[] | null;
}
export interface ResponseEntity {
  groups?: (TrackerGroupEntity)[] | null;
  qqGroups?: (string | null)[] | null;
  _id: string;
  uid: string;
  displayName: string;
  nickname: string;
  __v: number;
}

export interface TrackerGroupEntity {
  id: string;
  nickname: string;
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
  groups?: (TrackerGroupEntity)[] | null;
  qqGroups?: (string)[] | null;
  _id: string;
  uid: string;
  displayName: string;
  nickname: string;
  __v: number;
}
