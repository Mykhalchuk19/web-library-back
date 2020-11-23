const { FileModel, BookModel } = require('../models');

class BookController {
  static async addBook (req, res) {
    try {
      const { id, file, book } = res.locals;
      const fileId = await FileModel.addFile(file, id);
      const createdBook = await BookModel.query().insert({
        ...book,
        created_by: id,
        file_id: fileId,
      })
        .withGraphFetched('[file, category]')
        .modifyGraph('file', (builder) => {
          builder.select('filename');
        })
        .modifyGraph('category', (builder) => {
          builder.select('title');
        })
        .select('id', 'title',
          'short_description', 'city',
          'year', 'publishing_house',
          'edition', 'series', 'created_by');
      return res.status(200).send({
        book: createdBook,
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
      const books = await BookModel.getBooks(currentLimit, q);
      const count = await BookModel.getCount(q);
      return res.status(200).send({
        limit: parseInt(limit, 10),
        page: parseInt(validPage, 10),
        books,
        count: count[0]['count(`id`)'],
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }

  static async updateBook (req, res) {
    try {
      const { id: bookId } = req.params;
      const { file, book, fileId } = res.locals;
      const updatedFileId = await FileModel.updateFile(file, fileId);
      const updatedBook = await BookModel.query().updateAndFetchById(bookId, {
        ...book,
        file_id: updatedFileId,
      });
      return res.status(200).send({
        book: updatedBook,
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

  static async downloadBook (req, res) {
    try {
      const { filename } = req.params;
      const pathFile = await FileModel.downloadFile(filename);
      if (!pathFile) return res.status(400).json({ error: 'File is not exists' });
      return res.download(pathFile);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }
}

module.exports = BookController;
