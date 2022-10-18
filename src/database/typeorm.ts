import { DataSource } from 'typeorm';
import Config from '../lib/utils/config';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: Config.DB_HOST,
  username: Config.DB_USER,
  password: Config.DB_PASSWORD,
  port: Config.DB_PORT,
  database: Config.DB_DATABASE,
  entities: ['src/entities/**.ts'],
  logging: true,
  synchronize: true,
});
