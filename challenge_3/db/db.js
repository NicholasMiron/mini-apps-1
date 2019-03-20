const {con} = require('./db_config.js')

const getAllUsers = (cb) => {
  con.query('SELECT * FROM users', (err, res) => {
    if (err) console.error(err)
    else cb(null, res);
  });
}

const addUser = (options, cb) => {
  con.query(`INSERT INTO users(name, email, password) \
  VALUES('${options.name}','${options.email}','${options.password}')`, (err, res) => {
    if(err) cb(err);
    else cb(null, res);
  })
}

module.exports = {getAllUsers, addUser};