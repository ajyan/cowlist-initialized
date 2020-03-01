var mysql = require('mysql');
var Promise = require('bluebird');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'cows'
});

connection.connect(err => {
  if (err) throw err;
  else console.log('Connected to database');
});

connection.queryAsync = Promise.promisify(connection.query);

exports.connection = connection;
