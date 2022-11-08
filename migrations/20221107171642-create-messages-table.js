'use strict';

/**
 * @type {import('sequelize-cli').Migration}
*/
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('messages',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        user_id: {
          type:Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          }
        },
        group_id: {
          type:Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'groups',
            key: 'id',
          }
        },
        message: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now')
        },
      });
  },
  down(queryInterface) {
    return queryInterface.dropTable('messages');
  },
};