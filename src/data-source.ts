import { DataSource } from "typeorm";
import { Article } from "./article/entities/article.entity";

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Cwy17824',
  database: 'typeorm_migration_test',
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
