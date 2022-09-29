import {userController} from "../controllers/userController";
import express from "express";
const router = express.Router()

router.get('/:id', userController.get);
router.put('/:id', userController.update);
router.post('/', userController.create);
router.delete('/:id', userController.delete);
router.get('/', userController.list);

export default router;