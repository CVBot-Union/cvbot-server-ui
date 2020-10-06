export interface RTGroupDetail {
  success: boolean;
  response: Response;
}
export interface Response {
  property: Property;
  _id: string;
  members?: (MembersEntity)[] | null;
  leaders?: (MembersEntity)[] | null;
  name: string;
  __v: number;
}
export interface Property {
  themeColor: string;
  icon: string;
  description: string;
}
export interface MembersEntity {
  dutyDescription: string;
  _id: string;
  id: string;
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
