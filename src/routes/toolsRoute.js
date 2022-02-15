import { Router } from 'express';
import 'express-group-routes';
import * as toolsController from '../controllers/toolsController.js';

const router = new Router();

router.group('/tools', (route) => {
  route.get('', toolsController.getAllTools);
});

export default router;
