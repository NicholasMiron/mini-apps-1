const express = require('express');
const app = express();
const PORT = 10000;
const path = require('path');

app.use(express.json({urlencoded: false}));
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('/hello', (req, res) => {
  res.send('hello');
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})