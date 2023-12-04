import { Model } from "mongoose";

export interface TOrder {
    productName: string;
    price: number;
    quantity: number;
}

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
    orders: [TOrder],
    isDeleted: boolean
}

export interface TUpdateUser {
    userId?: number;
    username?: string;
    password?: string;
    fullName: TFullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: [string];
    address: TAddress,
    orders: [TOrder],
    isDeleted: boolean
}

// static method
export interface TUserModel extends Model<TUser> {
    isUserExists(userId: number): Promise<TUser | null>;
}
