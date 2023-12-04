import bcrypt from "bcrypt"
import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrder, TUser, TUserModel } from "./user.interface";
import config from "../../config";

export const orderSchema = new Schema<TOrder>({
    productName: {
        type: String,
        required: [true, "Product name is required."]
    },
    price: {
        type: Number,
        required: [true, "Price is required."]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required."]
    }
})

const fullNameSchema = new Schema<TFullName>({
    firstName: {
        type: String,
        required: [true, "User firstname is required."]
    },
    lastName: {
        type: String,
        required: [true, "User lastname is required."]
    }
})

const addressSchema = new Schema<TAddress>({
    street: {
        type: String,
        required: [true, "Street is required."]
    },
    city: {
        type: String,
        required: [true, "City is required."]
    },
    country: {
        type: String,
        required: [true, "Country is required."]
    }
})

const userSchema = new Schema<TUser, TUserModel>({
    userId: {
        type: Number,
        unique: true,
        required: [true, "User id is required."]
    },
    username: {
        type: String,
        unique: true,
        required: [true, "Username id is required."]
    },
    password: {
        type: String,
        required: [true, "Password id is required."]
    },
    fullName: fullNameSchema,
    age: {
        type: Number,
        required: [true, "Age id is required."]
    },
    email: {
        type: String,
        required: [true, "Email id is required."]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    hobbies: {
        type: [String],
        required: [true, "Hobbies are required."]
    },
    address: addressSchema,
    orders: [orderSchema],
    isDeleted: {
        type: Boolean,
        default: false
    }
})

/**
 * password hash before save data
 */
userSchema.pre("save", async function (next) {
    const hashPassword = await bcrypt.hash(this.password, Number(config.saltRounds));
    this.password = hashPassword;

    next()
})


/**
 * after update operation 
 */
userSchema.post("updateOne", async function (doc, next) {
    this.find().select("-password -isDeleted -_id -fullName._id -address._id -orders -__v")
    next()
})

/**
 * create a custom static method
 */
userSchema.statics.isUserExists = async function (userId: number) {
    const existingUser = await UserModel.findOne({ userId })

    return existingUser;
}

//TODO: If you can't find information about the user

const UserModel = model<TUser, TUserModel>('user', userSchema);
export default UserModel;