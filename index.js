const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const Knex = require('knex');
const { Model } = require('objection');
const { UserRouter, AuthRouter } = require('./src/routes');

const app = express();
const knexFile = require('./knexfile');

const knex = Knex(knexFile.production);
Model.knex(knex);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', UserRouter);
app.use('/auth', AuthRouter);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send('WHATABYTE: Food For Devs');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
