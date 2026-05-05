import { DataSource } from "typeorm";
import { Article } from "./article/entities/article.entity";
import { config } from "dotenv";

config({ path: 'src/.env' });

console.log(process.env);

export default new DataSource({
  type: 'mysql',
  host: process.env.mysql_server_host,
  port: Number(process.env.mysql_server_port),
  username: process.env.mysql_server_username,
  password: process.env.mysql_server_password,
  database: process.env.mysql_server_database,
  synchronize: false,
  logging: true,
  entities: [Article],
  migrations: ['src/migrations/**.ts'],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  }
})
