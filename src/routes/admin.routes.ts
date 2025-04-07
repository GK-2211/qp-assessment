import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authenticateToken, isAdmin } from '../middleware/auth.middleware';

const router = Router();
const adminController = new AdminController();

router.use(authenticateToken, isAdmin);

router.post('/grocery', adminController.addGroceryItem);
router.get('/grocery', adminController.getGroceryItems);
router.post('/update/grocery/', adminController.updateGroceryItem);
router.delete('/grocery/:id', adminController.deleteGroceryItem);

export { router as adminRouter };
