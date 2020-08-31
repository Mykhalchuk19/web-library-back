const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { UserRouter: usRouter } = require('./src/routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', usRouter);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send('WHATABYTE: Food For Devs');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
