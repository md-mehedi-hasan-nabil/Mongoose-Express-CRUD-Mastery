import express from "express";
import userController from "./user.controller";

const router = express.Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:userId/orders", userController.getUserOrders);
router.get("/users/:userId/orders/total-price", ()=> {});
router.get("/users/:userId", userController.getSingleUser);
router.post("/users/", userController.createNewUser);
router.patch("/users/:userId", userController.updateUserInfo);
router.put("/users/:userId/orders", userController.addNewOrder);
router.delete("/users/:userId", userController.deleteUserInfo);

export default router;