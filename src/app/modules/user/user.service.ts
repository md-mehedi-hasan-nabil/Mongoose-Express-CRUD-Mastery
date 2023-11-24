import UserModel from "./user.model";

function getUsers() {
    return UserModel.find()
}

function getUser(userId: number) {
    return UserModel.findOne({ userId })
}


export default {
    getUsers, getUser
}