import { Request, Response } from "express"
import userService from "./user.service"

async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await userService.getUsers()

        res.status(200).json({
            success: true,
            message: "User data find successful.",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server side error.",
            data: null
        })
    }
}

async function getSingleUser(req: Request, res: Response) {
    try {
        const userId = req.params.userId;
        const user = await userService.getUser(Number(userId))

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
    getAllUsers, getSingleUser
}