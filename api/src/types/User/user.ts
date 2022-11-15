export interface UserEntity {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserResponse {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  id?: string;
  username?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateUserResponse {
  id: string;
  username?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserStatus {
  Active = 'active',
  Pending = 'pending',
  Blocked = 'blocked',
  Deleted = 'deleted',
}

export enum AccessLevel {
  USER,
  MODERATOR,
  ADMIN,
}

export type Token = {
  _id: string;
};

export type TokenClaims = {
  id: string;
  accessLevel: AccessLevel;
};
