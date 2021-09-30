import * as api from '../api/index.js';

export const getUserToken = async (credentials) => {
    try {
        const data = await api.getUserToken(credentials);
        
        return data;
    }
    catch {
        console.log("Error in getUserToken ");
    }

}
export const RegisterUser = async (employee) => {
    try {
        const res = await api.registerEmployee(employee);

        const token = await api.getUserToken({ username: employee.email, password: employee.password });
        
        return token;


    }
    catch {
        console.log("Error in RegisterUser ");
    }

}
export const getUserDetails = async (token) => {

    try {
        const details = await api.getUserDetails(token);

        return details.data.details;
    }
    catch {
        console.log("Error in getUser ");
    }

}