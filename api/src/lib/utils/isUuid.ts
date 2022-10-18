import { validate as uuidValidate } from 'uuid';

export const isUuid = (uuid: string) => {
  return uuidValidate(uuid);
};
