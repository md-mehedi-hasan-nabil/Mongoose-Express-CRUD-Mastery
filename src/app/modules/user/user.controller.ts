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

async function getSingleUser(req: Request, res: Response) {
    try {
        const userId = req.params.userId;
        const user = await userService.getUser(Number(userId))

        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
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

        res.status(200).json({
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

async function updateUserInfo(req: Request, res: Response) {
    try {
        const { user } = req.body;
        const updatedUserInfo = await userService.updateUser(user);

        res.status(200).json({
            success: true,
            message: "User data find successful.",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server side error.",
            data: null
        })
    }
}

export default {
    getAllUsers, getSingleUser, createNewUser, updateUserInfo
}