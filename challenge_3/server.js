const db = require('./db/db.js');
const express = require('express');
const app = express();
const port = 65535;

app.use(express.json({urlEncoded: true}));
app.use(express.static('./public'));

app.get('/', (req, res) => {
  console.log('Request received');
  res.end('Request received');
})

app.get('/checkout', (req, res) => {
  console.log('Request');
  res.end('Request received');
})

app.get('/users', (req, res) => {
  db.getAllUsers((err, users) => {
    if(err) {
      console.error('Failed to get all users from db')
      res.send('Failed to get users from db');
    }
    else res.send(users);
  })
})

app.post('/users', (req, res) => {
  let userData = req.body;
  let insertID;
  db.addUser(userData.account, (err, results) => {
    if (err) {
      res.send('Failed to post user to db');
    } else {
      insertID = results.insertId;
      userData.shipping.insertedID = insertID;
      userData.payment.insertedID = insertID;
      db.addShipping(userData.shipping, (err, results) => {
        if (err) console.error(err);
        else {
          db.addPayment(userData.payment, (err, results) => {
            if (err) console.error(err)
            else {
              res.end('success');
            }
          })
        }
      })
    }
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})