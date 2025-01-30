const db = require('../db/queries');

const addCategoryGET = async (req, res) => {
  res.render('newCategory', { title: 'new category' });
};
const addCategoryPOST = async (req, res) => {
  const { title } = req.body;
  await db.addCategory(title);
};
const viewCategories = async (req, res) => {
  const categories = await db.viewAllCategories();
  res.render('categories', { title: 'Categories', categories });
};
module.exports = {
  addCategoryGET,
  addCategoryPOST,
  viewCategories,
};
