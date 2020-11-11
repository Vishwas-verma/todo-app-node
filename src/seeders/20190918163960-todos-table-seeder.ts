import { QueryInterface, SequelizeStatic } from "sequelize";
import { dbService } from "../services/db.service";
import * as faker from "faker";
import { User } from "../models/user.model";
import { Todo } from "../models/todo.model";

dbService; // Initialising Sequelize...

const clients: any[] = [];


export = {
  /**
   * Write code here to seed data.
   *
   * @param queryInterface
   * @param Sequelize
   */
  up: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    for (let i = 0; i < 10; i++) {
      const users = await User.findAll();
      clients.push({
        title      : faker.lorem.text(),
        description: faker.lorem.sentence(),
        created_by : faker.random.arrayElement(users).id,
        createdAt  : new Date(),
        updatedAt  : new Date(),
      });
    }
    return Todo.bulkCreate(clients);
  },

  /**
   * Write code here for drop seed data.
   *
   * @param queryInterface
   * @param Sequelize
   */
  down: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return Todo.truncate();
  }
};
