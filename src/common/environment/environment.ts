import { Type, plainToClass } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNumber,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DatabaseConfig } from './object-config/database.config';

export class Environment {
  @IsIn(['production', 'test', 'development'])
  NODE_ENV = process.env.NODE_ENV;

  @IsString()
  SERVICE_NAME = process.env.SERVICE_NAME;

  @IsNumberString()
  PORT = process.env.SERVICE_PORT;

  @IsString()
  USER_SERVER_ADDR = process.env.USER_SERVER_ADDR;

  // Database
  @ValidateNested()
  @Type(() => DatabaseConfig)
  DATABASE: DatabaseConfig = plainToClass(DatabaseConfig, {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
  });
}
