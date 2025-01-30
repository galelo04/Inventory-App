const { Client } = require('pg');
require('dotenv').config();
const { USER, HOST, PORT, PASSWORD, DATABASE } = process.env;

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  cid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  ctitle VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS items (
  iid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  ititle VARCHAR(255),
  quantity INTEGER,
  price FLOAT
);

CREATE TABLE IF NOT EXISTS cat_items (
  cid INTEGER,
  iid INTEGER,
  PRIMARY KEY (cid, iid),
  FOREIGN KEY (cid) REFERENCES categories
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  FOREIGN KEY (iid) REFERENCES items
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    host: HOST, // or wherever the db is hosted
    user: USER,
    database: DATABASE,
    password: PASSWORD,
    port: PORT, // The default port
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
