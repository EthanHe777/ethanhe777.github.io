import { Router } from 'express';
import { createErrandTask, listErrandTasks, updateErrandStatus } from '../controllers/errandController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createErrandValidation, updateErrandStatusValidation } from '../validations/errandValidation.js';

const router = Router();

router.get('/', listErrandTasks);
router.post('/', authMiddleware, createErrandValidation, validateRequest, createErrandTask);
router.patch('/:id/status', authMiddleware, updateErrandStatusValidation, validateRequest, updateErrandStatus);

export default router;
