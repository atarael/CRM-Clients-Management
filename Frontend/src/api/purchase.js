import * as api from '../api/index.js';

export const getLastWeekNewPurchases = async () => {
    try {
        const response = await api.getLastWeekNewPurchases();
        const countOfLastPurchases = response.data.length;
        return countOfLastPurchases;
    }
    catch {
        console.log("Error in getLastWeekNewPurchases ");
        return null;
    }

}
 export const getWeeklyPurchases = async () => {
    try {
        const response = await api.getWeeklyPurchases();
        
        const monthlyPurchases = response.data[0].data;
        return monthlyPurchases;
    }
    catch {
        console.log("Error in getWeeklyPurchases ");
        return null;
    }

}

export const getAllPurchases = async (clientId) => {
    try {
        const response = await api.getAllPurchases(clientId);
        return response.data ;
    }
    catch {
        console.log("Error in getAllPurchases ");
        return null;
    }

}

export const addNewPurchase = async (newPurchase) => {
    try {
        const response = await api.addNewPurchase(newPurchase);
        return response ;
    }
    catch {
        console.log("Error in addNewPurchase ");
        return null;
    }

}