import * as api from '../api/index.js';

export const getLastWeekNewProducts = async () => {
    try {
        const response = await api.getLastWeekNewProducts();
        return response.data;
    }
    catch {
        console.log("Error in getLastWeekNewProducts ");
        return null;
    }

}

export const getProductList = async () => {
    try {
        const response = await api.getProductList();
        return response.data;
    }
    catch {
        console.log("Error in getProductList ");
        return null;
    }

}

export const addProduct = async (newProduct) => {
    try {
        const response = await api.addProduct(newProduct);
        return response.data;
    }
    catch {
        console.log("Error in addProduct ");
        return null;
    }

}

export const getProduct = async (productId) => {
    try {
        const response = await api.getProduct(productId);
        
        return response.data;
    }
    catch (err) {
        console.log("Error in getProduct \n" + err);
        return null;
    }

}

export const updateProduct = async (productId, productJson) => {
    try {
        const response = await api.updateProduct(productId, productJson);
        return response.data;
    }
    catch {
        console.log("Error in updateProduct ");
        return null;
    }

}