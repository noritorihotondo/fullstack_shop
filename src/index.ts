import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './database/typeorm';
import Config from './lib/utils/config';

const PORT = Config.PORT || 8080;

const main = async () => {
  try {
    await AppDataSource.initialize();
    await app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
