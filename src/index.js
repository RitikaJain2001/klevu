const express = require('express');
const restServiceRouter = require('./rest-service');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 6000;
app.use('/', restServiceRouter);
app.listen(port, () => {
  console.log(`Listening at http://localhost:6000`);
});