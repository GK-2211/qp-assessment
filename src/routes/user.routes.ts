import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
const userController = new UserController();

router.get('/grocery', userController.getAvailableGroceryItems);

router.use(authenticateToken);

router.post('/orders', userController.createOrder);

export { router as userRouter };
