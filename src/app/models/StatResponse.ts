export interface StatResponseRootObject {
  success: boolean;
  response: StatResponse;
}

export interface StatResponse {
  tweetCount: number;
  rtgroupCount: number;
  trackerCount: number;
  userCount: number;
}
