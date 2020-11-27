const { Model } = require('objection');

class AuthorModel extends Model {
  static get tableName () {
    return 'authors';
  }

  static get relationMappings () {
    const BookModel = require('./BookModel');
    return {
      books: {
        relation: BookModel.ManyToManyRelation,
        modelClass: BookModel,
        join: {
          from: 'books.id',
          through: {
            from: 'authors_books.book_id',
            to: 'authors_books.author_id',
          },
          to: 'authors.id',
        },
      },
    };
  }

  static async getAuthors (currentLimit, q, id = null) {
    const query = this
      .query()
      .withGraphFetched('books')
      .modifyGraph('books', (builder) => {
        builder.select('title');
      })
      .select('id', 'firstname', 'lastname');
    if (q && q.length !== 0) {
      query.whereRaw(`title LIKE '%${q}%'`);
    }
    if (id) {
      query.where('id', id);
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

module.exports = AuthorModel;
