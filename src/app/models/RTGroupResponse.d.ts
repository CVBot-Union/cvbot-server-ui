export interface RTGroupDetail {
  success: boolean;
  response: Response;
}
export interface Response {
  property: Property;
  members?: (string)[] | null;
  leaders?: (string)[] | null;
  _id: string;
  name: string;
  __v: number;
}
export interface Property {
  themeColor: string;
  icon: string;
}

export interface AllRTGroup {
  success: boolean;
  response: Response[];
}
