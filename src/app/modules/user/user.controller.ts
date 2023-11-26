import { Request, Response } from "express"
import userService from "./user.service"
import { TUser } from "./user.interface";
import userValidationSchema from "./user.validation";

async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await userService.getUsers()

        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                "code": 404,
                "description": "User not found!"
            }
        })
    }
}

/**
 * all orders for a specific user
 */
async function getUserOrders(req: Request, res: Response) {
    try {
        const userId = req.params.userId;
        const orders = await userService.getOrders(Number(userId));

        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: orders
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Order fetched failed!",
            error: {
                "code": 404,
                "description": "Server side error."
            }
        })
    }
}

async function getSingleUser(req: Request, res: Response) {
    try {
        const userId = req.params.userId;
        const user = await userService.getUser(Number(userId))

        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                "code": 404,
                "description": "User not found!"
            }
        })
    }
}

/**
 * create a new user 
 */
async function createNewUser(req: Request, res: Response) {
    try {
        const { user }: { user: TUser } = req.body;
        const { error, value } = userValidationSchema.validate(user);

        if (error) {
            return res.status(500).json({
                success: false,
                message: "User data validation failed.",
                "error": {
                    "code": 404,
                    "description": error.details
                }
            })
        }

        const newUser = await userService.createUser(value)

        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: newUser,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "User can not create.",
            error: {
                code: 404,
                description: error?.message ? error?.message : "Server side error."
            }
        })
    }
}

/**
 * update user information
 */
async function updateUserInfo(req: Request, res: Response) {
    try {
        const userId = req.params.userId;
        const updatedUserInfo = await userService.updateUser(Number(userId), req.body);

        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: updatedUserInfo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server side error.",
            data: null
        })
    }
}

/**
 * delete user informstion
 */

async function deleteUserInfo(req: Request, res: Response) {
    try {
        const userId = req.params.userId;

        await userService.deleteUser(Number(userId))

        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server side error.",
            data: null
        })
    }
}

/**
 * add new product in order
 */
async function addNewOrder(req: Request, res: Response) {
    try {
        const userId = req.params.userId
        const { productName, price, quantity } = req.body || {};

        const result = await userService.addOrder(Number(userId), { productName, price, quantity });

        if (result?.modifiedCount > 0) {
            res.status(201).json({
                success: true,
                message: "Order created successfully!",
                data: null
            })
        } else {
            throw new Error("Product order failed.")
        }


    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "order failed.",
            error: {
                code: 404,
                description: error?.message ? error?.message : "Server side error."
            }
        })
    }
}

/**
 * Calculate Total Price
 */
async function calculateTotalPrice(req: Request, res: Response) {
    try {
        const userId = req.params.userId;
        const result = await userService.totalPrice(Number(userId));

        if (result?.length > 0) {
            if (result[0]?.totalAmount) {
                res.status(200).json({
                    success: true,
                    message: "Total price calculated successfully!",
                    totalAmount: Number(result[0].totalAmount.toFixed(2))
                })
            } else {
                throw new Error("Price calculation failed.")
            }

        } else {
            throw new Error("Price calculation failed.")
        }


    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Order price calculate fail.",
            error: {
                code: 404,
                description: error?.message ? error?.message : "Server side error."
            }
        })
    }
}

export default {
    getAllUsers, getUserOrders, getSingleUser, createNewUser, updateUserInfo, deleteUserInfo, addNewOrder, calculateTotalPrice
}