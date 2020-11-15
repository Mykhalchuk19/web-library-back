const { not } = require('ramda');

const { CategoryModel } = require('../models');

class CategoryController {
  static async addCategory(req, res) {
      try {
          const { categoryData } = res.locals;
          const category = await CategoryModel
              .query()
              .insert({...categoryData})
              .withGraphFetched('creator')
              .modifyGraph('creator', (builder) => {
                  builder.select('firstname', 'lastname');
              })
          return res.status(200).send({
              category,
          });
      } catch (e) {
          console.log(e);
          return res.status(400).json({ error: 'Something went wrong' });
      }
  }

  static async getCategoriesList (req, res) {
      try {
          const { page = 0, limit = 10, q = '' } = req.query;
          const validPage = parseInt(page, 10);
          const currentLimit = limit * (validPage + 1);
          const categories = await CategoryModel.getCategories(currentLimit, q);
          const count = await CategoryModel.getCount(q);
          return res.status(200).send({
              limit,
              page: parseInt(validPage, 10),
              categories,
              count: count[0]['count(`id`)'],
          });
      } catch (e) {
          console.log(e);
          return res.status(400).json({ error: 'Something went wrong' });
      }
  }

  static async updateCategory(req, res) {
      try{
        const { categoryData } = res.locals;
        const { id } = req.params;
          const category = await CategoryModel.query().findById(id);
          if (not(category)) return res.status(400).send('Category is not exists');
          const updatedCategory = await category
              .$query()
              .withGraphFetched('creator')
              .modifyGraph('creator', (builder) => {
                  builder.select('firstname', 'lastname');
              })
              .updateAndFetch(categoryData);
          return res.status(200).send({
              category: updatedCategory,
          });
      } catch (e) {
          console.log(e);
          return res.status(400).json({ error: 'Something went wrong' });
      }
  }
  static async deleteCategory(req, res){
      try{
          const { id } = req.params;
          await CategoryModel.query().deleteById(id);
          return res.status(200).send({
              category: parseInt(id, 10),
          });
      }catch (e) {
          console.log(e);
          return res.status(400).json({ error: 'Something went wrong' });
      }
  }
  static async getCategoriesAutocomplete(req, res) {
      try {
        const { q = '', id = null } = req.query;
        const categories = await CategoryModel.getCategories(10, q, id);
        const autoCompleteCategories = categories.map(({ title, id }) => ({ label: title, value: id }))
          return res.status(200).send({
              autocomplete: autoCompleteCategories
          })
      } catch (e) {
          console.log(e);
          return res.status(400).json({ error: 'Something went wrong' });
      }
  }
}

module.exports = CategoryController;
