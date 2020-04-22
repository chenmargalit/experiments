const mysql2 = require('mysql2/promise');
// const mysql = require('mysql');
require('dotenv').config();
const redis = require('redis');

const asyncRedis = require('async-redis');
module.exports = client = asyncRedis.createClient({ host: '127.0.0.1' });

// module.exports = redisClient = redis.createClient({ host: '127.0.0.1' });

// a bit slower, but more secure. Allow 5 connections at any given time. Feel free to uncomment and retrieve the mysql.createConnection in the next lines for quicker reactions
module.exports = db = mysql2.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

// a bit faster, but less secure
// module.exports = db = mysql.createConnection({
//   host: 'remotemysql.com',
//   user: 'QHumDJGXfj',
//   password: 'NQMKK0TM1U',
//   database: 'QHumDJGXfj'
// });
// // createdb();
// db.connect(err => {
//   if (err) {
//     console.log('problem with connecting to db', err);
//   } else {
//     console.log(`connected successfully to db`);
//   }
// });

// const createdb = () => {
//   console.log('creating db');
//   let sql = `CREATE DATABASE`;
//   sql.db.query(sql, (err, result) => {
//     err
//       ? console.log('error while trying to create db', err)
//       : console.log(`db created successfully`, result);
//   });
// };

module.exports = createChecksTable = async (table) => {
  let sql = `CREATE TABLE ${table}(id int AUTO_INCREMENT, fullDate VARCHAR(50) NOT NULL, day VARCHAR(20),
  weight FLOAT NOT NULL, gap_from_yesterday FLOAT, exercise BOOLEAN NOT NULL, gap_from_beginning FLOAT, comment VARCHAR(1000), email VARCHAR(100), PRIMARY KEY(id))`;
  await db.query(sql, (err, result) => {
    err ? console.log(err) : console.log(`table ${table} creation succeeded`);
  });
};

module.exports = drop = async (table) => {
  console.log('dropping table');
  let sql = `drop table ${table}`;
  await db.query(sql, (err, result) => {
    err
      ? console.log('dropping table issue', err)
      : console.log(`table ${table} dropped succeeded`);
  });
};

module.exports = clearTable = (table) => {
  console.log('clearing table');
  let sql = `DELETE from ${table}`;
  db.query(sql, (err, result) => {
    err ? console.log('clearing table issue') : console.log('clearing table succeeded');
  });
};

module.exports = createUsersTable = async () => {
  try {
    let sql =
      'CREATE TABLE users(id INT AUTO_INCREMENT, EMAIL VARCHAR(100) NOT NULL, PASSWORD VARCHAR(200) NOT NULL,PRIMARY KEY(id))';
    await db.query(sql, (err, result) => {
      err
        ? console.log('error while creating users table', err)
        : console.log('Users table created');
    });
  } catch (e) {
    console.log('problem with creating users table', e);
  }
};
// creates table named Vasts
// createTable('Vasts');

// drop table named Vasts
// drop('Vasts');

// delete all from table named Vasts
// clearTable('Vasts');

module.exports = { db, drop, createChecksTable, clearTable, createUsersTable, client };
