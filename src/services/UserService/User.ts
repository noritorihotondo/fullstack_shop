import { User } from '../../entities/User';
import { APIError } from '../../lib/utils/api-error';
import { ApiErrorCode } from '../../types/HTTP/http.model';
import {
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UserEntity,
} from '../../types';
import { StatusCodes } from 'http-status-codes';

export const createUser = async ({
  firstname,
  lastname,
  email,
  password,
}: CreateUserRequest): Promise<CreateUserResponse> => {
  const user = new User();
  user.firstname = firstname;
  user.lastname = lastname;
  user.email = email;
  user.password = password;

  await user.save();

  if (!user) {
    throw new APIError(
      "Can't find the user",
      StatusCodes.NOT_FOUND,
      false,
      ApiErrorCode.CantFindUser,
      'CreateUser',
    );
  }

  return {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    createdAt: user.createdAt,
    id: user.id,
    updatedAt: user.updatedAt,
  };
};

export const findUserByEmail = async (email: string) => {
  const user = await User.findOneBy({ email });

  return user;
};

export const findUserById = async (id: string) => {
  const user = await User.findOneBy({ id });

  return user;
};

export const deleteUser = async (id: string) => {
  const user = await User.delete({ id });

  return user;
};

const getSafeUserValues = ({
  firstname,
  lastname,
  id,
  email,
  updatedAt,
  createdAt,
}: UserEntity) => ({
  firstname,
  lastname,
  id,
  email,
  updatedAt,
  createdAt,
});

export const updateUser = async (
  id: string,
  body: UpdateUserRequest,
): Promise<UpdateUserResponse> => {
  await User.update({ id }, { ...body, updatedAt: new Date() });

  const user = await findUserById(id);

  if (!user) {
    throw new APIError(
      "Can't find the user",
      StatusCodes.NOT_FOUND,
      false,
      ApiErrorCode.CantFindUser,
      'UpdateUser',
    );
  }

  return getSafeUserValues(user);
};
