import express from 'express';
import {accountRoute, newsRoute} from './routes';

const app = express();
const port = 8080;

var bodyParser = require('body-parser')
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

app.use('/proptit/account', accountRoute);
app.use('./proptit/news', newsRoute);

app.listen(port, () => console.log(`App listening on port ${port}!`));
