const pool = require('./pool');

const viewAllCategories = async () => {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
};

const addCategory = async (title) => {
  await pool.query('INSERT INTO categories (ctitle) VALUES ($1)', [title]);
};

module.exports = { viewAllCategories, addCategory };
