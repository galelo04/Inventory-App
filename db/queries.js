const pool = require('./pool');

//////////////////////////////////////////categories///////////////////////////////////////////////////////
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

const deleteCategory = async (id) => {
  await pool.query('DELETE FROM categories WHERE cid=$1', [id]);
};

//////////////////////////////////////////items///////////////////////////////////////////////////////

const viewAllItems = async () => {
  const { rows } = await pool.query('SELECT iid,ititle FROM items');
  return rows;
};
const viewItemDetails = async (id) => {
  const query = `
    SELECT i.ititle, i.price, i.quantity, 
           ARRAY_AGG(c.ctitle) AS categories
    FROM items i
    JOIN cat_items ci ON i.iid = ci.iid
    JOIN categories c ON c.cid = ci.cid
    WHERE i.iid = $1
    GROUP BY i.ititle, i.price, i.quantity
  `;

  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};

const addItem = async (title, price, quantity, categories) => {
  try {
    const result = await pool.query(
      'INSERT INTO items (ititle, quantity, price) VALUES ($1, $2, $3) RETURNING iid',
      [title, quantity, price]
    );

    const iid = result.rows[0].iid;

    if (categories.length > 0) {
      const values = categories
        .map((category) => `(${category}, ${iid})`)
        .join(',');
      await pool.query(`INSERT INTO cat_items (cid, iid) VALUES ${values}`);
    }

    console.log('Item added successfully!');
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

module.exports = {
  viewAllCategories,
  addCategory,
  updateCategory,
  getCategory,
  deleteCategory,
  viewAllItems,
  viewItemDetails,
  addItem,
};
