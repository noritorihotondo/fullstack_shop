enum UserRole {
  User = 'USER',
  Moderator = 'MODERATOR',
  Admin = 'ADMIN',
}

export interface LoginRes {
  name: string;
  email: string;
  role: UserRole;
  id: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

export type RegisterRes = null;

export interface RegisterReq {
  username: string;
  email: string;
  password: string;
  // confirmPassword: string;
}

export interface SuccessResponse<Data> {
  status: string;
  data: Data;
}

export type LogoutRes = null;
