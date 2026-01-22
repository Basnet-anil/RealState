import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { EnvironmentConfiguration } from './env.config'
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: EnvironmentConfiguration.DATABASE_URL,
  entities: [__dirname + '/../entities/*/**.entity{.ts,.js}'],
  migrations: [__dirname + '/../migration/**/*{.ts,.js}'],
  synchronize: true,
  logging: true,
  dropSchema: false,
})
