'use strict';

/**
 * @type {import('sequelize-cli').Migration}
*/
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('users',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        firstname: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        lastname: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: 'users_email_key'
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now')
        }
      }).then(() => {
        return queryInterface.addConstraint(
          'users',
          { 'fields': ['email'], 'name': 'users_email_key', 'type': 'UNIQUE' },
        );
      });
  },
  down(queryInterface) {
    return queryInterface.dropTable('users');
  },
};