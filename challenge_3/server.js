const db = require('./db/db.js');
const express = require('express');
const app = express();
const port = 3050;

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
  console.log(req.body);
  db.addUser(req.body, (err, results) => {
    if (err) {
      console.err('Failed to post user to db');
      res.send('Failed to post user to db');
    } else {
      res.send('Succsfully added user');
    }
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})