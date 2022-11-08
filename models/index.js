'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.js")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    logging: false,
    port: config.port,
    dialect: config.dialect,
    pool: {
      max: 30,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      idle_in_transaction_session_timeout: 30000,
    },
    define: {
      freezeTableName: false,
      syncOnAssociation: false,
      timestamps: false,
    },
  },
);

const models = {
  users: require("./users")(sequelize, DataTypes),
  groups: require("./groups")(sequelize, DataTypes),
  participants: require("./participants")(sequelize, DataTypes),
  messages: require("./messages")(sequelize, DataTypes),
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
