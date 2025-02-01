const db = require('../db/queries');

const viewItems = async (req, res) => {
  const items = await db.viewAllItems();
  res.render('items', { title: 'Items', items });
};
const viewItemDetails = async (req, res) => {
  const { id } = req.params;
  const item = await db.viewItemDetails(id);
  console.log(item);
  res.render('item', { title: 'Item Details', item });
};
const addItemGET = async (req, res) => {
  const categories = await db.viewAllCategories();
  res.render('newItem', { title: 'new item', categories });
};
const addItemPOST = async (req, res) => {
  const { title, price, quantity, selectedCategories } = req.body;
  console.log('cat', selectedCategories);
  await db.addItem(title, price, quantity, selectedCategories);
  res.redirect('/items');
};

const updateItemGET = async (req, res) => {
  const { id } = req.params;
  const item = await db.viewItemDetails(id);
  const categories = await db.viewAllCategories();
  res.render('updateItem', {
    title: 'update item',
    str: JSON.stringify(item),
    item,
    categories,
  });
};

const updateItemPOST = async (req, res) => {
  const { id } = req.params;
  const { title, price, quantity, selectedCategories } = req.body;
  await db.updateItem(id, title, price, quantity, selectedCategories);
  res.redirect('/items');
};

const deleteItem = async (req , res) => {
  const {id} = req.params;
  await db.deleteItem(id);
  res.redirect('/items');
}

module.exports = {
  viewItems,
  viewItemDetails,
  addItemGET,
  addItemPOST,
  updateItemGET,
  updateItemPOST,
  deleteItem
};
