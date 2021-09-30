import * as api from '../api/index.js';

export const getClientsDataDistributionByMonth = async () => {
    try {
        const response = await api.getClientsDataDistributionByMonth();
        return response.data[0].data;

    }
    catch {
        console.log("Error in getClientsDataDistributionByMonth ");
        return null;
    }

}

export const getLastWeekNewClients = async () => {
    try {
        const response = await api.getLastWeekNewClients();
        return response.data;
    }
    catch {
        console.log("Error in getLastWeekNewClients ");
        return null;
    }
}

export const getClientsList = async () => {
    try {
        const response = await api.getClientsList();
        return response.data;
    }
    catch {
        console.log("Error in getClientsList ");
        return null;
    }
}

export const getClientById = async (clientId) => {
    try {
        const response = await api.getClientById(clientId);
        return response.data;
    }
    catch {
        console.log("Error in getClientById");
        return null;
    }
}

export const searchClient = async (clientName) => {
    try {
        const response = await api.searchClient(clientName);
        return response.data;
    }
    catch {
        console.log("Error in searchClient");
        return null;
    }
}

export const addNewClient = async (newClient) => {
    try {
        const response = await api.addNewClient(newClient);
        return response ;
    }
    catch {
        console.log("Error in addNewClient");
        return null;
    }
}

export const updateClientDetails = async (uniqeId, clientJson) => {
    try {
        
        const response = await api.updateClientDetails(uniqeId, clientJson);
        return response;
    }
    catch {
        console.log("Error in updateClientDetails");
        return null;
    }
}
