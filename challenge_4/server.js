const express = require('express');
const app = express();
const PORT = 65535;

app.use(express.json({urlencoded: false}));
app.use(express.static('client/dist'));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})