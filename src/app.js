import express from 'express';
import cors from 'cors';

import toolsRoute from './routes/toolsRoute.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(toolsRoute);

export default app;
