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
const updateCategoryGET = async (req, res) => {
  const { id } = req.params;
  const category = await db.getCategory(id);
  console.log(category);
  res.render('updateCategory', { title: 'update category', category });
};
const updateCategoryPOST = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  await db.updateCategory(id, title);
  res.redirect('/categories');
};
module.exports = {
  addCategoryGET,
  addCategoryPOST,
  viewCategories,
  updateCategoryGET,
  updateCategoryPOST,
};
