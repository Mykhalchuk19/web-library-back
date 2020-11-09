const { Model } = require('objection');

class CategoryModel extends Model {
  static get tableName () {
    return 'categories';
  }

  static get modifiers () {
    return {
      defaultSelects (builder) {
        builder.select('id', 'firstName', 'lastName');
      },
    };
  }

  static get relationMappings () {
    const UserModel = require('./UserModel');
    return {
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'categories.created_by',
          to: 'users.id',
        },
      },
    };
  }

  static async getCategories (currentLimit, q) {
    const query = this
      .query()
      .withGraphFetched('creator')
      .modifyGraph('creator', (builder) => {
        builder.select('firstname', 'lastname');
      })
      .select('id', 'title', 'short_description', 'description', 'parent_id');
    if (q && q.length !== 0) {
      query.whereRaw(`title LIKE '%${q}%'`);
    }
    query
      .limit(parseInt(currentLimit, 10))
      .orderBy('id');
    return query;
  }

  static async getCount (q) {
    const count = this.query();
    if (q && q.length !== 0) {
      count.whereRaw(`title LIKE '%${q}%'`);
    }
    count.count('id');
    return count;
  }
}

module.exports = CategoryModel;
