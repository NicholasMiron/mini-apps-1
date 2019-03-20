const {isValidJson, turnToCSV} = require('./helpers.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const pug = require('pug');
const compiledIndex = pug.compileFile('./views/index.pug');

app.use(express.static('./client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.set('view engine', 'pug');


app.post('/parser', (req, res) => {
  let data = JSON.stringify(req.body);
  console.log(data);
  if(isValidJson(data)) {
    data = JSON.parse(data);
    turnToCSV(data, (err, results) => {
      if (err) {
        res.send(compiledIndex({csv: 'Failed to generate csv'}))
      } else {
        res.send(compiledIndex({csv: results}))
      }
    });
  } else {
    res.send(compiledIndex({csv:'INVALID JSON'}));
  }

})

app.post('/', (req, res) => {
  let fileData = '';
  req.on('data', (da) => {
    fileData += da;
  });
  req.on('end', () => {
    fileData = fileData.slice(fileData.indexOf('{'), fileData.lastIndexOf('}') + 1);
    console.log(typeof fileData, fileData); //String
    if (isValidJson(fileData)) {
      fileData = JSON.parse(fileData);
      turnToCSV(fileData, (err, results) => {
        if(err) {
          res.end(compiledIndex({csv: 'Failed to generate csv'}))
        } else {
          res.send(compiledIndex({csv: results}));
        }
    });`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    `
    } else {
      res.end(compiledIndex({csv: 'INVALID JSON'}));
    }
  });
})

app.listen(port, () => console.log(`Listening on port ${port}`));

