import express from 'express';
import cors from 'cors';
import { newsRoute } from './routes';
import { errorHandle } from './helpers';
import { requiresLogin } from './middleware';
import { configs } from './configs';

import accountRoute from './routes/accountRoutes';
import passportRoute from './configs/passport';

// import {accountRoute} from './routes'

const app = express();
app.use(express.json());
app.use(cors());
app.use(errorHandle);

app.use('/proptit/accounts', accountRoute);
// app.use('/proptit/news', newsRoute);
app.use('/jwt', passportRoute);

const port = process.env.NODE_ENV === 'production' ? 80 : 8080;
app.listen(port, () => console.log(`App listening on port ${port}!`));
