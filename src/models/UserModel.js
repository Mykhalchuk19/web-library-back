const { Model } = require('objection');
const randomstring = require('randomstring');
const getUserFields = require("../utils/helpers/getUserFieldsHelper");
const { getPermissionsForRole, getCurrentRole } = require("../utils/helpers/roleHelpers");

class UserModel extends Model {
  static get tableName () {
    return 'users';
  }

  static async getUserWithPermissions(id) {
    const user = await this.query().findById(id);
    const { type } = user;
    const permissions = this.getPermissions(type);
    return  {
      ...getUserFields(user),
      permissions,
    }
  }

   static getPermissions(type) {
    const roleName = getCurrentRole(type);
    return [...getPermissionsForRole(roleName)]
  }

  static generateCode (length = 30, charset = 'alphanumeric') {
    return randomstring.generate({ length, charset });
  }

  static checkActivationCode (userActiveCode, activeCode) {
    return userActiveCode === activeCode;
  }

  static checkResetPasswordCode (userResetPasswordCode, resetPasswordCode) {
    return userResetPasswordCode === resetPasswordCode;
  }

  static async getUsers (currentLimit, q) {
    const query = this.query()
      .select('id', 'username', 'firstname', 'lastname', 'email', 'type', 'status');
    if (q && q.length !== 0) {
      query.whereRaw(`username LIKE '%${q}%'`);
    }
    query
      .limit(parseInt(currentLimit, 10))
      .orderBy('id');
    return query;
  }

  static async getCount (q) {
    const count = this.query();
    if (q && q.length !== 0) {
      count.whereRaw(`username LIKE '%${q}%'`);
    }
    count.count('id');
    return count;
  }
}

module.exports = UserModel;
