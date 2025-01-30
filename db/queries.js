const pool = require('./pool');

const viewAllCategories = async () => {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
};

const getCategory = async (id) => {
  const { rows } = await pool.query('SELECT * FROM categories WHERE cid=$1', [
    id,
  ]);
  return rows[0] || null;
};

const addCategory = async (title) => {
  await pool.query('INSERT INTO categories (ctitle) VALUES ($1)', [title]);
};

const updateCategory = async (id, title) => {
  await pool.query('UPDATE categories SET ctitle=$1 WHERE cid=$2', [title, id]);
};

module.exports = {
  viewAllCategories,
  addCategory,
  updateCategory,
  getCategory,
};
