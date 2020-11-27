const { Model } = require('objection');

class AuthorBookModel extends Model {
  static get tableName () {
    return 'authors_books';
  }
}

module.exports = AuthorBookModel;
