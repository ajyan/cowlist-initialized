const express = require('express');
const conn = require('./db');
const app = express();
const port = 3000;
// data sent back over the computer is parsed
const bodyParser = require('body-parser');

app.use(express.static('./client/dist'));
app.use(bodyParser());
app.get('/', (req, res) => res.render('/index.html'));

app.get('/api/cows', (req, res) => {
  let getQuery = 'SELECT * FROM cowlist';
  conn.connection.queryAsync(getQuery).then(result => {
    res.send(result);
  });
});

app.post('/api/cows', (req, res) => {
  let body = req.body;
  let postQuery = 'INSERT INTO cowlist (cows, description) VALUES (?,?)';
  conn.connection.queryAsync(postQuery, [body.cowname, body.description]);
  res.send(201);
});

app.put('/api/cows', (req, res) => {
  let body = req.body;
  let putQuery = 'UPDATE cowlist SET cows=?, description=? WHERE id=?';
  conn.connection.queryAsync(putQuery, [body.cows, body.description, body.id]);
  res.send(200);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
