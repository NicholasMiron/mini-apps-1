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
  // let data = JSON.stringify(req.body);
  let data = req.body;
  console.log(typeof data,data);
  // let data = JSON.parse(JSON.stringify(req.body));
  if(isValidJson(data)) {
    data = JSON.parse(data);
    console.log('in here', data)
    turnToCSV(data, (err, results) => {
      if (err) {
        res.send(compiledIndex({csv: 'Failed to generate csv'}))
      } else {
        res.end(compiledIndex({csv: results}))
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


let isValidJson = function(test) {
  try {
    JSON.parse(test);
  } catch (e) {
    return false;
  }
  return true;
}

let turnToCSV = function(json, cb) {
  if(json.children) {

    let output = '';
    if(cb) {
      output = getKeys(json);
    }

    output += turnToString(json);
    if(json.children.length > 0) {
      for(let i = 0; i < json.children.length; i++) {
        output += turnToCSV(json.children[i]);
      }
    }
    
    if(cb) {
      cb(null, output);
    } else {
      return output;
    }
  } else {
    return cb(null, 'failure');
  }
}

let turnToString = function(obj) {
  let output = '';
  for(let key in obj) {
    if (key !== 'children') {
      output += obj[key] + ','
    }
  }
  output = output.slice(0,-1);
  return output += '<br>';
}

let getKeys = function(children) {
  let output = '';
  for (key in children) {
    if (key !== 'children') {
      output += key + ','
    }
  }
  output = output.slice(0,-1);
  return output += '<br>';
}
