import {DataSource} from 'typeorm';
import {User} from './entities/User'

console.log(__dirname)

export const AppDataSource = new DataSource({
    type: "mysql",
    host: '127.0.0.1',
    username: 'elo',
    password: 'secret',
    port: 3306,
    database: 'fullstack_shop',
    entities: ['src/entities/**.ts'],
    logging: true,
    synchronize: true,
})