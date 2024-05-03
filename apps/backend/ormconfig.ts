import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const { DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE } =
  process.env;

export const dataSource = new DataSource({
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [__dirname + '/src/**/*.entity.{ts,js}'],
  ssl: {
    rejectUnauthorized: false,
  },
} as DataSourceOptions);

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
