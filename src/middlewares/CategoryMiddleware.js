const { not } = require('ramda');
const { CategoryModel } = require('../models');

const createCategoryMiddleware = async (req, res, next) => {
  const { title, short_description: shortDescription, description, parent_id: parentId } = req.body;
  const { id } = res.locals;
  if (not(title)) {
    return res.status(400).json({ error: 'You should input title of category' });
  }
  const category = await CategoryModel.query().findOne({ title });
  if (category) {
    return res.status(400).json({ error: 'Title should be unique' });
  }
  res.locals.categoryData = {
    title,
    short_description: shortDescription,
    description,
    parent_id: parentId,
    created_by: id,
  };
  return next();
};

const updateCategoryMiddleware = async (req, res, next) => {
  const { title, short_description: shortDescription, description, parent_id: parentId } = req.body;
  const { id } = req.params;
  if (not(id)) {
    return res.status(400).json({ error: 'This category is not exists' });
  }
  if (not(title)) {
    return res.status(400).json({ error: 'You should input title of category' });
  }
  res.locals.categoryData = {
    title,
    short_description: shortDescription,
    description,
    parent_id: parentId,
  };
  return next();
};

module.exports = {
  createCategoryMiddleware,
  updateCategoryMiddleware,
};
