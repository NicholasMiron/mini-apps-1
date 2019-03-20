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

})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})