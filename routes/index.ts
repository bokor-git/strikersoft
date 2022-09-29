import userRouter from '../src/users/routes/userRouter';
import authRouter from '../src/auth/routes/authRouter';
import { Router } from "express";
import isAuth from "../src/global/middlewares/isAuth";
import isAdmin from "../src/global/middlewares/isAdmin";

const router = Router();

router.use('/users', isAuth, isAdmin, userRouter);
router.use('/auth', authRouter);

export default router;