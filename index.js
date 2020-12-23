const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const Knex = require('knex');
const { Model } = require('objection');
const multer = require('multer');
const randomstring = require('randomstring');
const fs = require('fs');
const { UserRouter, AuthRouter, CategoryRouter, BookRouter, AuthorRouter } = require('./src/routes');

const app = express();
const knexFile = require('./knexfile');
// for dev you need to use development, for prod - production
const knex = Knex(knexFile.development);
Model.knex(knex);

app.use('/apidoc', express.static('apidoc'));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(multer({
  // dest: 'uploads',
  storage: multer.diskStorage({ destination: (req, file, cb) => {
    const pathUploads = './uploads/';
    fs.mkdirSync(pathUploads, { recursive: true });
    return cb(null, pathUploads);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${randomstring.generate({ length: 15, charset: 'alphanumeric' })}${file.originalname}`);
  } }),
}).single('file'));
app.use('/categories', CategoryRouter);
app.use('/users', UserRouter);
app.use('/auth', AuthRouter);
app.use('/books', BookRouter);
app.use('/authors', AuthorRouter);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send('WHATABYTE: Food For Devs');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
