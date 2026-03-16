import { Router } from 'express';
import { createSecondHandItem, listSecondHandItems } from '../controllers/secondHandController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createSecondHandValidation, listSecondHandValidation } from '../validations/secondHandValidation.js';

const router = Router();

router.get('/', listSecondHandValidation, validateRequest, listSecondHandItems);
router.post('/', authMiddleware, upload.array('images', 6), createSecondHandValidation, validateRequest, createSecondHandItem);

export default router;
