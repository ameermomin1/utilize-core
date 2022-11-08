const models = require("../index");
const  { validateHash } = require("../../utils/crypto");

class UsersService {
  static async getUsers(attributes, options, transaction = null) {
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

      return models.users.findAll(query);
    } catch (error) {
      throw error;
    }
  }

  static async isUserExist(email) {
    try {
      const user = await models.users.findOne({
        where: {
            email,
        }
      });
      return !!user;
    } catch (error) {
      throw error;
    }
  }

  static async loginUser(email, password) {
    try {
      const user = await models.users.findOne({
        where: {
            email,
        },
        raw: true,
      });
      if (user) {
        const passwordHash = user.password;
        const isValid = await validateHash(passwordHash, password);
        if (!isValid) {
            return false;
        }
        return user;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  static async create(user, transaction = null) {
    try {
      const options = {
        returning: true,
        raw: true,
        transaction
      };
      return await models.users.create(user, options);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsersService;
