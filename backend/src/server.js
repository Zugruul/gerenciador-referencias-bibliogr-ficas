const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const PORT = 3007;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors())

const services = require('./services')

app.get('/', function (req, res) {
  res.send({ 
    status: 'alive' 
  })
});

app.route('/references')
  .get(function(req, res) {
    const { id, orderBy, isDesc } = req.query || {}

    if(id) {
      services.references
        .read(id)
        .then(reference => res.send({ status: 'success', data: reference }))
        .catch(error => {
          res.status(400)
          res.send({ status: 'error', message: error.message })
        })
    } else {
      services.references
        .list({ orderBy, isDesc })
        .then(references => res.send({ status: 'success', data: references }))
        .catch(error => {
          res.status(400)
          res.send({ status: 'error', message: error.message })
        })
    }
  })
  .post(function(req, res) {
    services.references
      .create(req.body)
      .then(reference => res.send({ status: 'success', data: reference }))
      .catch(error => {
        res.status(400)
        res.send({ status: 'error', message: error.message })
      })
  })
  .put(function(req, res) {
    services.references
      .update(req.body)
      .then(reference => res.send({ status: 'success', data: reference }))
      .catch(error => {
        res.status(400)
        res.send({ status: 'error', message: error.message })
      })
  })
  .delete(function(req, res) {
    services.references
      .delete(req.query.id)
      .then(reference => res.send({ status: 'success', data: reference }))
      .catch(error => {
        res.status(400)
        res.send({ status: 'error', message: error.message })
      })
  })

app.listen(PORT, function () {
  console.log(`App está rodando na porta ${PORT}!`);
});