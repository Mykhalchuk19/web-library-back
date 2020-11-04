const { Model } = require('objection');

class UserModel extends Model {
  static get tableName () {
    return 'users';
  }

  static async getUsers (currentLimit, q) {
    const query = this.query()
      .select('id', 'username', 'firstname', 'lastname', 'email');
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
