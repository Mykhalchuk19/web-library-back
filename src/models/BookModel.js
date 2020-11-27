const { Model } = require('objection');

class BookModel extends Model {
  static get tableName () {
    return 'books';
  }

  static get relationMappings () {
    const FileModel = require('./FileModel');
    const CategoryModel = require('./CategoryModel');
    return {
      file: {
        relation: Model.HasOneRelation,
        modelClass: FileModel,
        join: {
          from: 'books.file_id',
          to: 'files.id',
        },
      },
      category: {
        relation: Model.HasOneRelation,
        modelClass: CategoryModel,
        join: {
          from: 'books.category_id',
          to: 'categories.id',
        },
      },
    };
  }

  static async getBooks (currentLimit, q, id = null) {
    console.log(q);
    const query = this
      .query()
      .withGraphFetched('[file, category]')
      .modifyGraph('file', (builder) => {
        builder.select('filename');
      })
      .modifyGraph('category', (builder) => {
        builder.select('title');
      });
    if (q && q.length !== 0) {
      query.whereRaw(`title LIKE '%${q}%'`);
    }
    if (id) {
      query.where('id', id);
    }
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

module.exports = BookModel;