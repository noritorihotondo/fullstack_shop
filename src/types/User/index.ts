export interface UserEntity {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateUserResponse = UserEntity;

export interface CreateUserRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export type UpdateUserRequest = Partial<CreateUserRequest>

export type UpdateUserResponse = UserEntity;

