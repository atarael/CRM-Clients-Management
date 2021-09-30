import * as api from '../api/index.js';
export const getEmployeeDetailsByMail = async (employeeEmail) => {
    try {
        const response = await api.getEmployeeDetailsByMail(employeeEmail);
        
        return response.data[0];
    } catch (err) {
        console.log("Error get employee details for employee mail: " + employeeEmail + "\nError details: " + err);
        return null;
    }
}



export const getEmployeesList = async () => {
    try {
        const response = await api.getEmployeesList();
        return response.data;
    } catch (err) {
        console.log("Error getEmployeesList");
        return null;
    }
}
