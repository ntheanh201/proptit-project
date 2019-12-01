import express from 'express';
import cors from 'cors';
import { errorHandle } from './helpers';

import { authRoute } from './routes';
import { accountRoute } from './routes';
import { groupRoute } from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(errorHandle);

app.use('/proptit', authRoute);
app.use('/proptit/accounts', accountRoute);
app.use('/proptit/groups', groupRoute);
// app.use('/proptit/news', newsRoute);

const port = process.env.NODE_ENV === 'production' ? 80 : 8080;
app.listen(port, () => console.log(`App listening on port ${port}!`));
