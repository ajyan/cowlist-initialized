const express = require('express');
const conn = require('./db');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(express.static('./client/dist'));
app.use(bodyParser());
app.get('/', (req, res) => res.render('/index.html'));

app.get('/api/cows', (req, res) => {
  var getQuery = 'SELECT * FROM cowlist';
  conn.connection.queryAsync(getQuery).then(result => {
    res.send(result);
  });
});

app.post('/api/cows', (req, res) => {
  var body = req.body;
  var postQuery = 'INSERT INTO cowlist (cows, description) VALUES (?,?)';
  conn.connection.queryAsync(postQuery, [body.cowname, body.description]);
  res.send(201);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
