const models = require("../index");
const Sequelize = require("sequelize");
const moment = require("moment");

class MessagesService {
  static async getmessagesByUserId(userId, offset = null, limit = null) {
    try {
      return models.messages.findAll({
        where: {
            user_id: userId
        },
        include: [{
            model: models.groups,
            attributes: ['name']
        }],
        raw: true,
        offset,
        limit,
      });
    } catch (error) {
      throw error;
    }
  }

  static async create(message, transaction = null) {
    try {
      const options = {
        returning: true,
        raw: true,
        transaction
      };
      return await models.messages.create(message, options);
    } catch (error) {
      throw error;
    }
  }

  static async getUsersWithMostMessages(startDate = null, endDate = null) {
    try {
      const cond = {};
      if (startDate && endDate) {
        cond.created_at = {
            [Sequelize.Op.between]: [ moment(startDate).toDate(), moment(endDate).toDate()]
        }
      } else if (startDate) {
        cond.created_at = {
            [Sequelize.Op.gte]: moment(startDate).toDate(),
        }
      } else if (endDate) {
        cond.created_at = {
            [Sequelize.Op.lte]: moment(endDate).toDate(),
        }
      }
      return models.messages.findAll({
        where: cond,
        attributes: [
            'user_id',
            [Sequelize.literal('COUNT("messages"."id")'), 'messageCount']
        ],
        include: {
            model: models.users,
            attributes: ['firstname', 'lastname'],
        },
        group: ['user_id', "user.id"],
        order: [['messageCount', 'DESC']],
        limit: 5,
      });
    } catch (error) {
      throw error;
    }
  }

  static async getGroupsWithMostMessages() {
    try {
      return models.messages.findAll({
        attributes: [
            'group_id',
            [Sequelize.literal('COUNT("messages"."id")'), 'messageCount']
        ],
        include: {
            model: models.groups,
            attributes: ['name'],
        },
        group: ['group_id', "group.id"],
        order: [['messageCount', 'DESC']],
        limit: 5,
      });
    } catch (error) {
      throw error;
    }
  }

  static async findAllByCond(cond, offset = null, limit = null) {
    try {
      return models.messages.findAll({
        where: cond,
        include: [{
            model: models.users,
            attributes: ['firstname', 'lastname']
        }],
        offset,
        limit,
        raw: true,
        order: [['created_at']]
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MessagesService;
