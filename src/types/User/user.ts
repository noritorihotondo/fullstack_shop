export interface UserEntity {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserResponse {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateUserResponse {
  id: string;
  firstname?: string;
  lastname?: string;
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
