import express from "express";
import { forgetPassword, getUser, login, logout, register, resetPassword, updatePassword, updateProfile } from "../controllers/authController.js";
import { asyncWrapper } from "../middlewares/catchAysncError.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post('/register', asyncWrapper(register));

router.post('/login', asyncWrapper(login));

router.get('/logout', isAuthenticated, asyncWrapper(logout));

router.get('/me', isAuthenticated, asyncWrapper(getUser));

router.post('/password/forgot', asyncWrapper(forgetPassword));

router.put('/password/reset/:resetToken', asyncWrapper(resetPassword));

router.put('/password/update', isAuthenticated, asyncWrapper(updatePassword));

router.put('/profile/update', isAuthenticated, asyncWrapper(updateProfile));


export default router;