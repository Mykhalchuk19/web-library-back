const { Model } = require('objection');

class UserModel extends Model {
  static get tableName () {
    return 'users';
  }
}

module.exports = UserModel;
