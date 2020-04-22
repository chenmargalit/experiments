const bcrypt = require('bcrypt');

module.exports = verifyPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let sql = 'select * from users where email = ?';
    const dbResult = await db.query(sql, email, (err, result) => {
      err ? console.log('problem with verifying password', err) : null;
    });
    const dbHashedPassword = Object.values(dbResult[0][0])[2];
    const isAuthenticated = await bcrypt.compare(password, dbHashedPassword);
    if (isAuthenticated) {
      next();
    } else {
      throw new Error('not authorized');
    }
  } catch (e) {
    res.status(401).send('cant find a user with this password');
    console.log('problem with verifyPassword', e);
  }
};
