import express from 'express';
import { verifyToken } from '../utlis/verifyUser.js';
import { verifyAdmin } from '../utlis/verifyAdmin.js';
import { adminDeleteUser, adminUpdateUser, createUser, getUsers } from '../controllers/admin.controller.js';




const router = express.Router();

router.use(verifyToken);
router.use(verifyAdmin);

router.get("/users", getUsers);
router.post("/user/create", createUser);
router.put("/user/update/:id", adminUpdateUser);
router.delete("/user/delete/:id", adminDeleteUser);

export default router;