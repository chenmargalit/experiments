const express = require('express');
const router = express.Router();
const { db } = require('../mysql/mysql');
const date = new Date();
const today = date.getDay();
const fullDate = date.toDateString();
const weightAtBegining = 85.9;

const dayOfWeek = (today) => {
  switch (today) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
  }
};

const getLastId = async () => {
  try {
    const res = await db.query('SELECT max(id) FROM weight');
    console.log('res in getLastId');
    return Object.values(res[0][0])[0];
  } catch (e) {
    console.log('problem with getting last id', e);
  }
};

const previousWeight = async (id) => {
  console.log('id is', id);
  try {
    const res = await db.query(`SELECT weight from weight where id=${id}`);
    console.log('res in prevWeight', Object.values(res[0][0])[0]);
    return Object.values(res[0][0])[0];
  } catch (e) {
    console.log('problem with previousWeight', e);
  }
};

router.post('/add_weight', async (req, res) => {
  try {
    let { weight, comment, exercise, email } = req.body;
    if (!weight || !exercise || !email) {
      Promise.reject('data is missing');
    }
    console.log('req.body in add_weight', req.body);
    const day = dayOfWeek(today);
    let prevWeight, gap_from_beginning, gap_from_yesterday;
    gap_from_beginning = weightAtBegining - weight;
    const highestId = await getLastId();
    console.log('previous id is ', highestId);
    if (highestId) {
      prevWeight = await previousWeight(highestId);
      gap_from_yesterday = weight - prevWeight;
      console.log(weight, prevWeight, gap_from_yesterday);
    } else {
      gap_from_yesterday = 999;
    }

    const values = {
      weight,
      comment,
      exercise,
      day,
      fullDate,
      gap_from_yesterday,
      gap_from_beginning,
      email,
    };
    const sql = 'INSERT INTO weight SET ?';
    await db.query(sql, values, (err, result) => {
      if (err) {
        console.log('error', err);
        res.status(502).send(err);
      }
    });
    res.status(200).send('success adding data');
  } catch (e) {
    console.log('rejection should arrive here 4739847272394739473294793947329');
    if (e.code === 'ECONNREFUSED') {
      res.status(503).send('Encountered a problem, please try again soon');
    } else {
      console.log('problem', e);
      res.status(500).send('Could not process request, please try later');
    }
  }
});

module.exports = router;
