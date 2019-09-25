import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import {accountRoute} from './routes';
// var bodyParser = require('body-parser')

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use('/proptit', accountRoute);

app.listen(port, () => console.log(`App listening on port ${port}!`));
