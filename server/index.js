const express = require('express');
const create = require('./routes/add_weight');
const fetch = require('./routes/get_data');
const users = require('./routes/users');
const bodyParser = require('body-parser');
const cors = require('cors');

const { drop, createTable, clearTable } = require('./mysql/mysql');
// drop('weight');
// createChecksTable('weight');
// clearTable('weight');
// createUsersTable();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/fetch', fetch);
app.use('/create', create);
app.use('/users', users);

app.get('/', (req, res) => {
  console.log('reached server');
});

app.listen(5000, () => {
  console.log('listening on server 5000');
});
