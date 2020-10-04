export interface Lookup {
  success: boolean;
  response: Response;
}
export interface Response {
  following: boolean;
  id: string;
  screen_name: string;
  name: string;
  protected: boolean;
  followers_count: number;
  formatted_followers_count: string;
  age_gated: boolean;
}
