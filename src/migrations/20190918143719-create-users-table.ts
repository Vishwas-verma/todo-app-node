import { QueryInterface, SequelizeStatic } from "sequelize";

export = {
    /**
     * Write code here for migration.
     *
     * @param queryInterface
     * @param Sequelize
     */
    up: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.createTable("users", {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.BIGINT
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    /**
     * Write code here for migration rollback.
     *
     * @param queryInterface
     * @param Sequelize
     */
    down: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.dropTable("users");
    }
};
