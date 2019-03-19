const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// const jade = require('jade');
const pug = require('pug');
const compiledIndex = pug.compileFile('./views/index.pug');


app.use(express.static('./client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.set('view engine', 'pug');

app.get('/parser', (req, res) => {
  res.send('Hello World');
});

app.post('/', (req, res) => {

  let fileData = '';
  req.on('data', (da) => {
    fileData += da;
  });
  req.on('end', () => {
    fileData = fileData.slice(fileData.indexOf('{'), fileData.lastIndexOf('}') + 1);
    
    if (isValidJson(fileData)) {
      fileData = JSON.parse(fileData);
      turnToCSV(fileData, (err, results) => {
        if(err) {
          res.send('Failed to generate csv');
        } else {
          res.end(compiledIndex({csv: results}));
        }
    });`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    `
    } else {
      res.send('Invalid JSON');
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

// The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of CSV report 
// (see included sample output), where the keys of the JSON objects will be the columns of the CSV report.

// You may assume the JSON data has a regular structure and hierarchy (see included sample file). 
// In other words, all sibling records at a particular level of the hierarchy will have the same set of properties, but child objects might not contain the same properties. 
// In all cases, every property you encounter must be present in the final CSV output.

// You may also assume that child records in the JSON will always be in a property called `children`.