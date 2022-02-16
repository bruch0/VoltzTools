import { Router } from 'express';
import 'express-group-routes';
import * as userController from '../controllers/userController.js';

const router = new Router();

router.group('/user', (route) => {
  route.post('/register', userController.newUser);
  route.post('/login', userController.login);
});

export default router;
