const path = require('path');
const express = require('express');
require('dotenv').config();
const indexRouter = require('./routes/indexRouter');
const categoriesRouter = require('./routes/categoriesRouter');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/categories', categoriesRouter);

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log('listening...');
});
