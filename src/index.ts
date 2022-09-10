import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './database/typeorm';

const PORT = process.env.PORT || 8080;

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
