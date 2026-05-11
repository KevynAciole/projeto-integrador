import { products } from "./mock/products.js";

let database = [...products];

export async function getProducts() {
    return database;
}

export async function addProduct(product) {
    const newProduct = {
        id: Date.now(),
        name: product.name,
        sector: product.sector,
        quantity: product.quantity ?? 0
    };

    database.push(newProduct);
}

export async function deleteProduct(id) {
    database = database.filter(product => product.id !== id);
}

export async function updateQuantity(id, amount) {
    database = database.map(product => {

        if (product.id === id) {

            const newQuantity = product.quantity + amount;

            return {
                ...product,
                quantity: newQuantity < 0 ? 0 : newQuantity
            };
        }

        return product;
    });
}

export async function updateProduct(id, data) {
    database = database.map(product => {
        if (product.id === id) {
            return {
                ...product,
                ...data
            };
        }

        return product;
    });
}