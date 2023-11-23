

interface Order {
    productName: string;
    price: number;
    quantity: number;
}

interface Name {
    firstName: string;
    lastName: string;
}

interface Address {
    street: string;
    city: string;
    country: string;
}

export interface User {
    userId: string;
    username: string;
    password: string;
    name: Name;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string;
    address: Address,
    orders: [Order]
}