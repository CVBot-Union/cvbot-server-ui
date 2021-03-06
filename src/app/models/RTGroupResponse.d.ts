export interface RTGroupDetail {
  success: boolean;
  response: Response;
}
export interface Response {
  property: Property;
  _id: string;
  members?: (MembersEntity)[] | null;
  name: string;
  __v: number;
  trackerUsername?: string;
}

export interface Property {
  themeColor: string;
  icon: string;
  description: string;
  templateFormat: string;
}
export interface MembersEntity {
  job: string;
  _id: string;
  id: string;
  username: string | null;
  isManager: boolean;
}

export interface ExtendedMembersEntity {
  dutyDescription: string;
  username: string;
  isInvalid: boolean;
  _id: string;
  id: string;
}

export interface AllRTGroup {
  success: boolean;
  response: Response[];
}

export interface DeleteRTGroup {
  success: boolean;
  response: DeleteRTGroupResponse;
}
export interface DeleteRTGroupResponse {
  group: Response;
  trackers: DeleteTrackers;
}

export interface DeleteTrackers {
  n: number;
  nModified: number;
  ok: number;
}
