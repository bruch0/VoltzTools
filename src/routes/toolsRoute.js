import { Router } from 'express';
import 'express-group-routes';

import * as toolsController from '../controllers/toolsController.js';

import authJwt from '../middlewares/authentication.js';

const router = new Router();

router.group('/tools', (route) => {
  route.get('', toolsController.getAllTools);
  route.get('/:toolId', toolsController.getToolById);

  route.use(authJwt);
  route.post('', toolsController.createTool);
  route.delete('/:toolId', toolsController.deleteTool);
});

export default router;
