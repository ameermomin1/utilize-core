const models = require("../index");

class ParticipantsService {
  static async getParticipants(attributes, options, transaction = null) {
    try {
      const query = {
        raw: true,
        transaction
      };

      if (attributes) {
        query.attributes = attributes;
      }
      if (options) {
        Object.assign(query, options);
      }

      return models.participants.findAll(query);
    } catch (error) {
      throw error;
    }
  }

  static async create(participant, transaction = null) {
    try {
      const options = {
        returning: true,
        raw: true,
        transaction
      };
      return await models.participants.create(participant, options);
    } catch (error) {
      throw error;
    }
  }

  static async bulkCreate(participants, transaction = null) {
    try {
      const options = {
        returning: true,
        raw: true,
        transaction
      };
      return await models.participants.bulkCreate(participants, options);
    } catch (error) {
      throw error;
    }
  }

  static async findOneByCond(cond, transaction = null) {
    try {
      return await models.participants.findOne({
        where: cond,
        raw: true,
        transaction,
      });
    } catch (error) {
      throw error;
    }
  }

  static async update(participant, cond) {
    try {
      return await models.participants.update(participant, {
        where: cond,
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ParticipantsService;
