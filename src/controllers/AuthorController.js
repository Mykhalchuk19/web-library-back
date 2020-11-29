const { AuthorModel } = require('../models');

class AuthorController {
  static async createAuthor (req, res) {
    try {
      const { authorData } = res.locals;
      const author = await AuthorModel.query().insert({
        ...authorData,
      });
      return res.status(200).send({
        author,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }

  static async getAuthorsList (req, res) {
    try {
      const { page = 0, limit = 10, q = '' } = req.query;
      const validPage = parseInt(page, 10);
      const currentLimit = limit * (validPage + 1);
      const authors = await AuthorModel.getAuthors(currentLimit, q);
      const count = await AuthorModel.getCount(q);
      return res.status(200).send({
        limit: parseInt(limit, 10),
        page: parseInt(validPage, 10),
        authors,
        count: count[0]['count(`id`)'],
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }

  static async updateAuthor (req, res) {
    try {
      const { authorData } = res.locals;
      const { id } = req.params;
      const author = await AuthorModel.query().findById(id);
      if (!author) return res.status(400).json({ error: 'Such author does not exists' });
      const updatedAuthor = await author
        .$query()
        .withGraphFetched('books')
        .modifyGraph('books', (builder) => {
          builder.select('books.id', 'title');
        })
        .updateAndFetch(authorData);
      return res.status(200).send({
        author: updatedAuthor,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }

  static async deleteAuthor (req, res) {
    try {
      const { id } = req.params;
      await AuthorModel.query().deleteById(id);
      return res.status(200).send({
        author: parseInt(id, 10),
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }

  static async getAuthorsAutocomplete (req, res) {
    try {
      const { q = '', id = null } = req.query;
      const authors = await AuthorModel.getAuthors(10, q, id);
      const autoCompleteAuthors = authors.map(({ firstname, lastname, id: authorId }) => (
        { label: `${firstname} ${lastname}`,
          value: authorId }));
      return res.status(200).send({
        autocomplete: autoCompleteAuthors,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }
}

module.exports = AuthorController;
