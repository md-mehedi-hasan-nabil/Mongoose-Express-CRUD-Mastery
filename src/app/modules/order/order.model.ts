import { Schema, model } from "mongoose";
import { Order } from "./order.interface";

export const orderSchema = new Schema<Order>({
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


const OrderModel = model<Order>('User', orderSchema);
export default OrderModel;