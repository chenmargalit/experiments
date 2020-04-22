const express = require('express');
const router = express.Router();
const { db, client } = require('../mysql/mysql');

const getUserData = async (email) => {
  try {
    const sql = 'select * from weight where email = ? ORDER BY id DESC';
    const [res] = await db.query(sql, email);
    return res;
  } catch (e) {
    console.log('problem with getUserData', e);
  }
};

const verifyToken = async (token) => {
  return client.get(token);
};

router.post('/get_data', async (req, res) => {
  try {
    // console.log(req.headers);
    // const { Authorization } = req.headers;
    // console.log('token is', Authorization);
    // ----------------------------------------------------------------
    const { token } = req.body;
    const emailFromRedis = await verifyToken(token);
    const userData = await getUserData(emailFromRedis);
    res.status(200).send(userData);
  } catch (e) {
    console.log('reached catch in get_data');
    if (e.code === 'ECONNREFUSED') {
      console.log('problem fetching data', e);
      res.status(503).send('not available, try later');
    } else {
      console.log('problem fetching data', e);
      console.log('4738979723947972394739');
      res.status(500).send('not working 456, error 500');
    }
  }
});

module.exports = router;
