import { StatusCodes } from 'http-status-codes';
import { User } from '../../entities/User';
import { APIError } from '../../lib/utils/api-error';
import { CreateUserRequest, CreateUserResponse, UpdateUserResponse, UserStatus, ApiErrorCode } from '../../types';

export const createUser = async (body: CreateUserRequest): Promise<CreateUserResponse> => {
  let user = new User();
  user.firstname = body.firstname;
  user.lastname = body.lastname;
  user.email = body.email;
  user.password = body.password;
  user.status = UserStatus.Pending;

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

  const { password, ...rest } = user;

  return rest;
};

export const findUserByEmail = async (email: string) => {
  const user = await User.findOneBy({ email });

  return user;
};

export const findUserById = async (id: string) => {
  const user = await User.findOneBy({ id });

  return user;
};

export const markAsDeleted = async (id: string) => {
  const user = await User.update({ id }, { status: UserStatus.Deleted, updatedAt: new Date() });

  return user;
};

export const updateUser = async (
  id: string,
  firstname: string,
  lastname: string,
  email: string,
): Promise<UpdateUserResponse> => {
  await User.update({ id }, { firstname, lastname, email, updatedAt: new Date() });

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

  return user;
};
