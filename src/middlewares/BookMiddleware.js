const { BookModel } = require('../models');

const isBook = async (req, res, next) => {
  const { id } = req.params;
  const book = await BookModel.query().findById(id);
  if (!book) return res.status(400).json({ error: 'Such book is not exists' });
  return next();
};

const checkBookFields = async (req, res, next) => {
  const {
    title,
    short_description: shortDescription,
    city,
    year,
    publishing_house: publishingHouse,
    edition,
    series,
    category_id: categoryId,
    authors: authorIds,
  } = req.body;
  if (!title || title.length === 0) return res.status(400).json({ error: 'Title is required' });
  res.locals.book = {
    title,
    short_description: shortDescription,
    city,
    year,
    publishing_house: publishingHouse,
    edition,
    series,
    category_id: typeof parseInt(categoryId, 10) !== 'number' ? null : categoryId,
  };
  res.locals.authorIds = authorIds.split(',').filter((id) => typeof parseInt(id, 10) === 'number');
  return next();
};

const checkFileId = async (req, res, next) => {
  const { file_id: fileId } = req.body;
  if (!fileId) return res.status(400).send({ error: 'Something went wrong' });
  res.locals.fileId = fileId;
  return next();
};

module.exports = {
  isBook,
  checkBookFields,
  checkFileId,
};
