import { Router } from 'express';
import { login, register } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { loginValidation, registerValidation } from '../validations/authValidation.js';

const router = Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);

export default router;
