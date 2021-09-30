// const express = require('express'),
//     login = require('./login.js'),
//     clients = require('./clients'),
//     calls = require('./calls'), 
//     products = require('./products'),
//     purchases = require('./purchases'),
//     tasks = require('./tasks'),
//     employees = require('./employees')
// var router = express.Router();

// // login
// router.post('/login', login.login);
// router.post('/getUserDetails/:token', login.getUserDetails);

// // clients
// router.get('/clients/getList', clients.get_clients_list)
// router.put('/clients/update/:clientID', clients.update_client)
// router.post('/clients/add', clients.add_client)
// router.get('/clients/search/:clientName', clients.search_client)
// router.get('/clients/getLastWeek', clients.get_last_clients)
// router.get('/clients/monthDistribution', clients.month_distribution)
// router.get('/clients/getClientById/:clientId', clients.get_client_by_id);

// // calls
// router.post('/calls/add', calls.add_call)
// router.get('/calls/getList/:clientID', calls.get_client_calls)

// // products
// router.post('/products/add', products.add_product);
// router.put('/products/update/:productID', products.update_product);
// router.get('/products/getList', products.get_products_list);
// router.get('/products/getLastWeek', products.get_last_products);
// router.get('/products/getProduct/:productId', products.get_product);

// // purchases
// router.post('/purchases/add', purchases.add_purchase);
// router.get('/purchases/getList/:clientId', purchases.get_client_purchase);
// router.get('/purchases/getLastWeek', purchases.get_last_purchase)
// router.get('/purchases/monthDistribution', purchases.month_distribution);
// router.get('/purchases/dayDistribution', purchases.day_distribution);
// router.get('/purchases/productDistribution', purchases.product_distribution);

// //tasks
// router.post('/tasks/add', tasks.add_task);
// router.put('/tasks/update/:taskId', tasks.update_task);
// router.get('/tasks/getList', tasks.get_tasks_list);
// router.delete('/tasks/delete/:taskId', tasks.delete_task);

// //employees
// router.get('/employees/getList', employees.get_employees_list);
// router.get('/employees/getEmployeeById/:employeeId', employees.get_employees_by_id);
// router.get('/employees/getEmployeeByEmail/:employeeEmail', employees.get_employees_by_Email);
// router.post('/employees/add', employees.add_employee)






// module.exports = router;
