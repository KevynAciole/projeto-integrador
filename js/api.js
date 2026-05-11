import { products } from "./mock/products.js";

let database = [...products];

export async function getProducts() {
    return database;
}

export async function addProduct(product) {
    database.push(product);
}

export async function deleteProduct(id) {
    database = database.filter(product => product.id !== id);
}

export async function updateQuantity(id, amount) {
    database = database.map(product => {
        if (product.id === id) {
            return {
                ...product,
                quantity: product.quantity + amount
            };
        }

        return product;
    });
}