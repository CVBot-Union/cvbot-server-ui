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
