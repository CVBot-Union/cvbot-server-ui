export interface AuthLogin {
  success: boolean;
  response: AuthLoginResponse;
}
export interface AuthLoginResponse {
  token: string;
  uid: string;
}

export interface CreateUser {
  success: boolean;
  response: CreateUserResponse;
}
export interface CreateUserResponse {
  optedOutTwitterIDs?: (string)[] | null;
  userLevel: number;
  _id: string;
  username: string;
  __v: number;
}
