import UserModel from "./user.model";
import { TOrder, TUpdateUser, TUser } from "./user.interface";

function getUsers() {
    return UserModel.find().select("-password -isDeleted -_id -fullName._id -address._id -orders -__v")
}

async function getUser(userId: number) {
    if (await UserModel.isUserExists(userId)) {

        return UserModel.findOne({ userId }).select("-password -isDeleted -_id -fullName._id -address._id -orders -__v")
    } else {
        throw new Error("User not found.")
    }
}

async function createUser(user: TUser) {
    const { userId } = user || {};

    const newUser = new UserModel(user);

    if (await UserModel.isUserExists(userId)) {
        throw new Error("User id alredy exist.")
    } else {
        await newUser.save()
    }

    const newData = await UserModel.findById(newUser._id).select("-password -isDeleted -_id -fullName._id -address._id -orders -__v");

    return newData;
}

async function updateUser(userId: number, userInfo: TUpdateUser) {
    delete userInfo.userId;
    delete userInfo.username;
    delete userInfo.password;

    await UserModel.updateOne({ userId }, {
        $set: userInfo
    }, { new: true })

    const newData = await UserModel.findOne({ userId }).select("-password -isDeleted -_id -fullName._id -address._id -orders -__v");

    return newData;
}

function deleteUser(userId: number) {
    return UserModel.deleteOne({ userId })
}

/**
 * add new order
 */
async function addOrder(userId: number, orderInfo: TOrder) {
    if (await UserModel.isUserExists(userId)) {
        return UserModel.updateOne(
            { userId },
            { $push: { orders: orderInfo } },
            { new: true }
        )
    } else {
        throw new Error("User id not found.")
    }
}

async function getOrders(userId: number) {
    if (await UserModel.isUserExists(userId)) {
        return UserModel.findOne({ userId }).select("-_id orders")
    } else {
        throw new Error("User not found.")
    }
}

/**
 * calculate total price
 */
async function totalPrice(userId: number) {
    if (await UserModel.isUserExists(userId)) {
        return UserModel.aggregate([
            { $match: { userId } },
            { $unwind: '$orders' },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$orders.price' },
                },
            }
        ])
    } else {
        throw new Error("User not found.")
    }

}

export default {
    getUsers, getOrders, getUser, createUser, updateUser, deleteUser, addOrder, totalPrice
}