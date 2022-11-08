'use strict';

/**
 * @type {import('sequelize-cli').Migration}
*/
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('groups',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING(60),
          allowNull: false
        },
        created_by: {
          type:Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          }
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now')
        },
        created_by: {
          type:Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          }
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      });
  },
  down(queryInterface) {
    return queryInterface.dropTable('groups');
  },
};