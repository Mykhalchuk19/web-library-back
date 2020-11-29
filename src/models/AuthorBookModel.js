const { Model } = require('objection');

class AuthorBookModel extends Model {
  static get tableName () {
    return 'authors_books';
  }

  static async updateAuthorsByBookId (bookId, authorIds) {
    const authors = await this.query().where('book_id', bookId);
    if (authorIds.length === 0) {
      await this.deleteAuthorsByBookId(bookId);
      return;
    }
    const relatedAuthorsIds = authors.map((author) => author.author_id);
    for (const authorId of authorIds) {
      const index = relatedAuthorsIds.indexOf(authorId);
      if (index === -1) {
        // eslint-disable-next-line no-await-in-loop
        await this.addAuthorById(authorId, bookId);
      } else {
        delete relatedAuthorsIds[index];
      }
    }
    await this.deleteAuthorsByIds(relatedAuthorsIds);
  }

  static async addAuthorById (id, bookId) {
    await this.query().insert({
      book_id: bookId,
      author_id: id,
    });
  }

  static async deleteAuthorsByIds (ids) {
    for (const id of ids) {
      // eslint-disable-next-line no-await-in-loop
      await this.query().where('author_id', id).delete();
    }
  }

  static async deleteAuthorsByBookId (id) {
    await this.query().where('book_id', id).delete();
  }
}

module.exports = AuthorBookModel;
