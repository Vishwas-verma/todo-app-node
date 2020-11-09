import { Sequelize } from "sequelize-typescript";
import {
  APP_IDENTIFIER,
  ENV_ENVIRONMENT,
  ENV_MYSQL_DB,
  ENV_MYSQL_HOSTNAME,
  ENV_MYSQL_PASSWORD,
  ENV_MYSQL_USER
} from "../util/secrets.util";
import logger from "../util/logger.util";
import { User } from "../models/user.model";
import { ENVIRONMENT_PRODUCTION } from "../util/constants.util";
import { Todo } from "../models/todo.model";
import { QueryOptions } from "winston";

class DBService {
  private _sequelize: Sequelize;

  private constructor() {
    logger.silly(`[${APP_IDENTIFIER}] DBService`);
    this._sequelize = new Sequelize({
      dialect : "mysql",
      host    : ENV_MYSQL_HOSTNAME,
      database: ENV_MYSQL_DB,
      username: ENV_MYSQL_USER,
      password: ENV_MYSQL_PASSWORD,
      logging : ENV_ENVIRONMENT !== ENVIRONMENT_PRODUCTION,
    });

    this._sequelize.addModels([
      Todo,
      User
    ]);
  }

  static getInstance(): DBService {
    return new DBService();
  }

  async rawQuery(sql: string | { query: string, values: any[] }, options?: QueryOptions): Promise<any> {
    // @ts-ignore
    return this._sequelize.query(sql, options);
  }
}

export const dbService = DBService.getInstance();
