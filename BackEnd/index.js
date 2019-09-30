import express from "express";
import cors from "cors";
import session from 'express-session';
import bodyParser from "body-parser";
import { newsRoute } from "./routes";
import { errorHandle } from "./helpers";
import { requiresLogin } from "./middleware";

import accountRoute from "./routes/accountRoutes";
// import {accountRoute} from './routes'

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(cors());
app.use(errorHandle);

// app.use( (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

app.use('/proptit', accountRoute);
// app.use("/proptit", newsRoute);

const port = process.env.NODE_ENV === 'production' ? 80 : 8080;
app.listen(port, () => console.log(`App listening on port ${port}!`));
