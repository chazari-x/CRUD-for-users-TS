import {DataSource} from "typeorm";
import {Users} from "./Users";
import dotenv from "dotenv";
dotenv.config();

const DB_HOST = process.env.DB_HOST ?? 'localhost';
const DB_PORT : number | undefined = parseInt(process.env.DB_PORT ?? '5432')
const DB_USER = process.env.DB_USER ?? 'postgres';
const DB_PASS = process.env.DB_PASS ?? 'postgrespw';
const DB_NAME = process.env.DB_NAME ?? 'postgres';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    entities: [Users],
    synchronize: true
});

export const initDataSource = async () => {
    await AppDataSource.initialize();
    console.log('Data source initialized');
};

initDataSource().catch((err) => console.error(err));
