import express from 'express';
import cors from 'cors';

import toolsRoute from './routes/toolsRoute.js';
import databaseError from './middlewares/databaseError.js';
import inexistentRoute from './routes/inexistentRoute.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(toolsRoute);

app.use(inexistentRoute);

app.use(databaseError);

export default app;
