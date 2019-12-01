import express from 'express';
import { authController } from '../controllers';
import { checkToken as authMiddleware } from '../middleware';

const authRoute = express.Router();

authRoute.post('/login', authController.login);
authRoute.get('/', authMiddleware, authController.index);

export default authRoute;
