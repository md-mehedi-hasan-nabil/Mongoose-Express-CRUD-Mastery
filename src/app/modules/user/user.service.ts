import UserModel from "./user.model";
import { TUser } from "./user.interface";

function getUsers() {
    return UserModel.find()
}

function getUser(userId: number) {
    return UserModel.findOne({ userId });
}

async function createUser(user: TUser) {
    const { userId } = user || {};

    const newUser = new UserModel(user);

    if (await newUser.isUserExists(userId)) {
        throw new Error("User id alredy exist.")
    } else {
        await newUser.save()
    }

    const newData = await UserModel.findById(newUser._id).select("-password -isDeleted -_id -fullName._id -address._id -orders -__v");

    return newData;
}

async function updateUser(userId: number, userInfo: TUser) {
    await UserModel.updateOne({ userId }, {
        $set: userInfo
    }, {new: true})

    const newData = await UserModel.findOne({userId})

    return newData;
}


export default {
    getUsers, getUser, createUser, updateUser
}