import { User } from "../models/user.model";
import { dbService } from "../services/db.service";
import { QueryInterface, SequelizeStatic } from "sequelize";

dbService; // Initialising Sequelize...

export = {
    /**
     * Write code here to seed data.
     *
     * @param queryInterface
     * @param Sequelize
     */
    up: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return User.create({
            first_name: "another",
            last_name: "admin",
            email: "admin@gmail.com",
            password: "secret"
        });
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
