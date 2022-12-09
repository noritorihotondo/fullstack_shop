import Config from './config';
export const createFilePath = (filename: string): string =>
  `${Config.BACKEND_DOMAIN}/images/${filename}`;
