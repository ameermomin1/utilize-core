const models = require("../index");

class GroupsService {
  static async getGroups(attributes, options, transaction = null) {
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

      return models.groups.findAll(query);
    } catch (error) {
      throw error;
    }
  }

  static async isGroupExist(groupName) {
    try {
      const group = await models.groups.findOne({
        where: {
            name: groupName,
        }
      });
      return !!group;
    } catch (error) {
      throw error;
    }
  }

  static async create(group, transaction = null) {
    try {
      const options = {
        returning: true,
        raw: true,
        transaction
      };
      return await models.groups.create(group, options);
    } catch (error) {
      throw error;
    }
  }

  static async getGroupsByUserId(userId, offset = null, limit = null) {
    try {
      const groups = await models.groups.findAll({
        attributes: ['name', 'created_at', 'created_by'],
        include: [
            {
                model: models.users,
                attributes: ['firstname', 'lastname'],
            },
            {
                model: models.participants,
                attributes: [['user_id', 'userId']],
                where: {
                    user_id: userId,
                    is_active: true,
                },
                include: {
                    model: models.users,
                    attributes: ['firstname', 'lastname'],
                }
            }
        ],
        offset,
        limit,
      });
      return groups;
    } catch (error) {
      throw error;
    }
  }

  static async findOneByCond(cond, transaction = null) {
    try {
      return await models.groups.findOne({
        where: cond,
        raw: true,
        transaction,
      });
    } catch (error) {
      throw error;
    }
  }

  static async update(group, cond) {
    try {
      return await models.groups.update(group, {
        where: cond,
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = GroupsService;
