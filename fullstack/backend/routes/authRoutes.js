import express from 'express';
import { registro, login, logout, forgotPassword } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/registro', registro);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);

export default router;