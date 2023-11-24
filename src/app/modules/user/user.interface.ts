import { Model } from "mongoose";
import { Order } from "../order/order.interface";

export interface TFullName {
    firstName: string;
    lastName: string;
}

export interface TAddress {
    street: string;
    city: string;
    country: string;
}

export interface TUser {
    userId: number;
    username: string;
    password: string;
    fullName: TFullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: [string];
    address: TAddress,
    orders: [Order],
    isDeleted: boolean
}

export interface IUserMethods {
    isUserExists(userId: number): Promise<TUser | null>;
}


export type TUserModel = Model<TUser, Record<string, never>, IUserMethods>;