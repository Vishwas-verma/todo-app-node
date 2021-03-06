import { QueryInterface, SequelizeStatic } from "sequelize";
import { dbService } from "../services/db.service";
import { User } from "../models/user.model";
import * as faker from "faker";

dbService; // Initialising Sequelize...


const users: any[] = [
  {
    first_name: "Todo Pro",
    last_name : "Admin",
    email     : "admin@gmail.com",
    password  : "secret",
    createdAt : new Date(),
    updatedAt : new Date(),
  }
];

export = {
  /**
   * Write code here to seed data.
   *
   * @param queryInterface
   * @param Sequelize
   */
  up: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    for (let i = 0; i < 20; i++) {
      users.push({
        first_name: faker.name.firstName(0),
        last_name : faker.name.lastName(0),
        email     : faker.internet.email(),
        password  : "secret",
        createdAt : new Date(),
        updatedAt : new Date(),
      });
    }
    return User.bulkCreate(users);
  },

  /**
   * Write code here for drop seed data.
   *
   * @param queryInterface
   * @param Sequelize
   */
  down: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return User.truncate();
  }
};
