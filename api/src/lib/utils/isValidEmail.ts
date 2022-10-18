import { validateRequestPayload } from './http';
import { emailBaseSchema } from '../../dto/User/create.user.dto';

export const isValidEmail = async (email: string): Promise<boolean> => {
  return await validateRequestPayload(email, emailBaseSchema);
};
