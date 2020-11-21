const { FileModel, BookModel } = require('../models');

class BookController {
  static async addBook (req, res) {
    try {
      const {
        title,
        short_description,
        city,
        year,
        publishing_house,
        edition,
        series,
        category_id,
      } = req.body;
      const { id } = res.locals;
      const filedata = req.file;
      const fileId = await FileModel.addFile(filedata, id);
      const book = await BookModel.query().insert({
        title,
        short_description,
        city,
        year,
        publishing_house,
        edition,
        series,
        category_id,
        created_by: id,
        file_id: fileId,
      });
      return res.status(200).send({
        book,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }

  static async getBooksList (req, res) {
    try {
      const { page = 0, limit = 10, q = '' } = req.query;
      const validPage = parseInt(page, 10);
      const currentLimit = limit * (validPage + 1);
      const categories = await BookModel.getBooks(currentLimit, q);
      const count = await BookModel.getCount(q);
      return res.status(200).send({
        limit: parseInt(limit, 10),
        page: parseInt(validPage, 10),
        categories,
        count: count[0]['count(`id`)'],
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }

  static async deleteBook (req, res) {
    try {
      const { id } = req.params;
      const book = await BookModel.query().findById(id);
      await BookModel.query().deleteById(id);
      await FileModel.removeFile(book.file_id);
      return res.status(200).send({
        book: parseInt(id, 10),
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }
}

module.exports = BookController;
