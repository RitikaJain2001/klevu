const CONFIG = require('../config');
const mysql = require('mysql2');
const productQuery = require('./productData');

const db = mysql.createConnection({
  host: CONFIG.mysql.host,
  user: CONFIG.mysql.username,
  password: CONFIG.mysql.password,
  database: CONFIG.mysql.database,
});


db.connect((err) => {
  if (err) throw err;
  console.log('btg_ci database connected succesfully!');
});

const product_query = productQuery({db});
module.exports = Object.freeze({
  product_query,
});
