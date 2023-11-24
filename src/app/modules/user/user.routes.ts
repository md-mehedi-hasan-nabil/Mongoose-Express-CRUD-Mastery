import express from "express";
import userController from "./user.controller";

const router = express.Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:userId", userController.getSingleUser);
router.post("/users/", userController.createNewUser);
router.patch("/users/:userId", userController.updateUserInfo);

export default router;