import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.DB_HOST;
const PORT = Number(process.env.DB_PORT ?? 5432);
const USERNAME = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const DB = process.env.DB_NAME;


export const DBConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: HOST,
    port: PORT,
    username: USERNAME,
    password: PASS,
    database: DB,
    entities: [],
    synchronize: true,
};
