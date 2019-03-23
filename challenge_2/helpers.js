
const isValidJson = function(test) {
  try {
    JSON.parse(test);
  } catch (e) {
    return false;
  }
  return true;
}

const turnToCSV = function(json, cb) {
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

const turnToString = function(obj) {
  let output = '';
  for(let key in obj) {
    if (key !== 'children') {
      output += obj[key] + ','
    }
  }
  output = output.slice(0,-1);
  return output += '<br>';
}

const getKeys = function(children) {
  let output = '';
  for (key in children) {
    if (key !== 'children') {
      output += key + ','
    }
  }
  output = output.slice(0,-1);
  return output += '<br>';
}

module.exports = {isValidJson, turnToCSV, turnToString, getKeys}