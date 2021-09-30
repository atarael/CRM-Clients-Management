import axios from 'axios';
const url = 'http://localhost:8080/'

export const getUserToken = (credentials) => {
    return fetch(url + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export const getUserDetails = (token) => axios.get(url + 'getUserDetails/' + token);

// employees
export const registerEmployee = (newEmployee) => axios.post(url + 'employees/add', newEmployee);
export const getEmployeeDetailsByMail = (employeeEmail) => axios.get(url + 'employees/getEmployeeByEmail/' + employeeEmail);
export const getEmployeesList = () => axios.get(url + 'employees/getList');

// purchases
export const getLastWeekNewPurchases = () => axios.get(url + 'purchases/getLastWeek');
export const getWeeklyPurchases = () => axios.get(url + 'purchases/dayDistribution');
export const getAllPurchases = (clientId) => axios.get('http://localhost:8080/purchases/getList/' + clientId);
export const addNewPurchase = (newPurchase) => axios.post('http://localhost:8080/purchases/add', newPurchase);

// clients
export const getClientsDataDistributionByMonth = () => axios.get(url + 'clients/monthDistribution');
export const getLastWeekNewClients = () => axios.get(url + 'clients/getLastWeek');
export const getClientById = (clientId) => axios.get(url + 'clients/getClientById/' + clientId);
export const updateClientDetails = (uniqeId, clientJson) => axios.put(url + 'clients/update/' + uniqeId, clientJson)
export const getClientsList = () => axios.get(url + 'clients/getList');
export const addNewClient = (newClient) => axios.post('http://localhost:8080/clients/add', newClient);
export const searchClient = (clientName) => axios.get(url + 'clients/search/' + clientName);


// products
export const getLastWeekNewProducts = () => axios.get(url + 'products/getLastWeek');
export const getProductList = () => axios.get(url + 'products/getList');
export const addProduct = (newProduct) => axios.post(url + 'products/add', newProduct);
export const getProduct = (productId) => axios.get(url + 'products/getProduct/' + productId);
export const updateProduct = (productId, productJson) => axios.put(url + 'products/update/' + productId, productJson);


// tasks
export const getAllTasks = () => axios.get(url + 'tasks/getList');
export const updateTask = (taskToEdit, content) => axios.put(url + 'tasks/update/' + taskToEdit, content);
export const addTask = (newTask) => axios.post(url + 'tasks/add', newTask);
export const removeTask = (taskId) => axios.delete(url + 'tasks/delete/' + taskId);

// call
export const getAllCalls = (clientId) => axios.get(url + 'calls/getList/' + clientId);
export const addNewCall = (newCall) => axios.post(url + 'calls/add', newCall);

















