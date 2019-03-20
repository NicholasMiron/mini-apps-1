const {con} = require('./db_config.js')

const getAllUsers = (cb) => {
  con.query('SELECT * FROM users', (err, res) => {
    if (err) console.error(err)
    else cb(null, res)
  });
}

const addUser = (options, cb) => {
  con.query(`INSERT INTO users(name, email, password) \
  VALUES('${options.name}','${options.email}','${options.password}')`, (err, res) => {
    if(err) cb(err)
    else cb(null, res)
  })
}

const addShipping = ({address1, address2, city, state, zipcode, phone, insertedID}, cb) => {
  con.query(`INSERT INTO shipping(addLine1, addLine2, city, state, zipcode, phone, nameID) \
  VALUES('${address1}', '${address2}', '${city}', '${state}', '${zipcode}', '${phone}', '${insertedID}')`, (err, res) => {
    if (err) cb(err) 
    else cb(null, res)
  })
}

const addPayment = ({card, expiration, cvv, billzip, insertedID}, cb) => {
  con.query(`INSERT INTO payment(cardNumber, expiration, cvv, billZip, userID) \
  VALUES('${card}', '${expiration}', '${cvv}', '${billzip}', '${insertedID}')`, (err, res) => {
    if (err) cb(err)
    else cb(null, res)
  })
}

module.exports = {getAllUsers, addUser, addShipping, addPayment};