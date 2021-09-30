import * as api from '../api/index.js';

export const getAllCalls = async (clientId) => {
    try {
        const response = await api.getAllCalls(clientId);
        return response.data;

    }
    catch {
        console.log("Error in getAllCalls ");
        return null;
    }

}
export const addNewCall = async (newCall) => {
    try {
        const response = await api.addNewCall(newCall);
        return response ;

    }
    catch {
        console.log("Error in addNewCall ");
        return null;
    }

}
