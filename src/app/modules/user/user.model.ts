import { Schema, model } from "mongoose";
import { Address, Name, User } from "./user.interface";
import { orderSchema } from '../order/order.model';

const nameSchema = new Schema<Name>({
    firstName: {
        type: String,
        required: [true, "User firstname is required."]
    },
    lastName: {
        type: String,
        required: [true, "User lastname is required."]
    }
})

const addressSchema = new Schema<Address>({
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

const userSchema = new Schema<User>({
    userId: {
        type: String,
        required: [true, "User id is required."]
    },
    username: {
        type: String,
        required: [true, "Username id is required."]
    },
    password: {
        type: String,
        required: [true, "Password id is required."]
    },
    name: nameSchema,
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
    orders: [orderSchema]
})


const UserModel = model<User>('User', userSchema);
export default UserModel;