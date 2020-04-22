const express = require('express');
const router = express.Router();
const { db } = require('../mysql/mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyPassword = require('../middleware/verifyPassword');
require('dotenv').config();

const signToken = (email) => {
  return jwt.sign(email, process.env.jwtSecret);
};

const setToken = (token, email) => {
  return client.set(token, email);
};

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const sql = 'INSERT INTO users SET email = ?, password = ? ';
    const values = [email, hash];
    db.query(sql, values, (err, result) => {
      if (err) {
        throw new Error('problem 123 with signup');
      }
    });
    res.status(200).send('user registered', tok);
  } catch (e) {
    console.log('problem with signing up', e);
  }
});

router.post('/signIn', verifyPassword, async (req, res) => {
  try {
    // console.log(req.headers);
    const { email } = req.body;
    // const sql = 'select * from users where email = ?';
    // const [rows] = await db.query(sql, email);
    // console.log('rows is', rows);
    const token = signToken(email);
    setToken(token, email);
    res.status(200).send({ token });
  } catch (e) {
    console.log('problem with signIn on server side', e);
  }
});

module.exports = router;
