const mysql = require('mysql');

const dbInfo = {
  host:'localhost',
  user:'root',
  password:'',
  database:'checkout'
}

const con = mysql.createConnection(dbInfo);
con.connect(() => console.log('connected to db'));

module.exports = {con};