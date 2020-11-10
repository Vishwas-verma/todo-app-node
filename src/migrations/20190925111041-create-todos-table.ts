import { QueryInterface, SequelizeStatic } from "sequelize";

export = {
  /**
   * Write code here for migration.
   *
   * @param queryInterface
   * @param Sequelize
   */
  up: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable("todos", {
      id         : {
        allowNull    : false,
        primaryKey   : true,
        autoIncrement: true,
        type         : Sequelize.BIGINT.UNSIGNED
      },
      title      : {
        type: Sequelize.STRING
      },
      description: {
        type     : Sequelize.STRING,
        allowNull: true,
      },
      created_by: {
        type      : Sequelize.BIGINT,
        allowNull : true,
        references: {
          model: "users",
          key  : "id"
        },
        onDelete: "set null"
      },
      createdAt  : {
        allowNull: false,
        type     : Sequelize.DATE
      },
      updatedAt  : {
        allowNull: false,
        type     : Sequelize.DATE
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
    return queryInterface.dropTable("todos");
  }
};
