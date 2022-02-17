import { Router } from 'express';
import 'express-group-routes';

import * as logsController from '../controllers/logsController.js';

import authJWT from '../middlewares/authentication.js';

const router = new Router();

router.group('/logs', (route) => {
  route.use(authJWT);
  route.get('', logsController.getLogs);
  route.get('/:userId', logsController.getLogsByUserId);
});

export default router;
