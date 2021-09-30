var Employee = require('../models/employee_model');
var mongoose = require('mongoose');

const add_employee = async function (req, res) {
    var new_Employee = new Employee();
    new_Employee.employee_id = req.body.employee_id
    new_Employee.first_name = req.body.first_name
    new_Employee.last_name = req.body.last_name
    new_Employee.phone_number = req.body.phone_number
    new_Employee.email = req.body.email
    new_Employee.password = req.body.password
    new_Employee.image = req.body.image
    new_Employee.about = req.body.about

    try {
        //save model to database
        await new_Employee.save();
        res.status(200).send("Employee: " + new_Employee.first_name + " added!");
    }
    catch (err) {
        console.log("Error in adding the new Employee:" + new_Employee);
        res.status(400).send("err: " + err + " while trying to insert Employee.");

    }
}
//get_employees_list
const get_employees_list = async function (req, res) {
    console.log("get_employees_list");
    try {
        const employees = await Employee.find({});
        res.status(200).send(employees);

    } catch (err) {
        console.log("Error find employees ");
        res.status(500).send(err);
    }
}

//get_employees_by_id
const get_employees_by_id = async function (req, res) {
    console.log("get_employees_by_id:\nid: " + req.params["employeeId"]);
    try {
        const employee = await Employee.find({ employee_id: req.params["employeeId"] });
        res.status(200).send(employee);

    } catch (err) {
        console.log("Error find employee by id: " + req.params["employeeId"]);
        res.status(500).send(err);
    }


}

//get_employees_by_Email
const get_employees_by_Email = async function (req, res) {
    console.log("get_employees_by_Email:\nemail: " + req.params["employeeEmail"]);
    try {
        const employee = await Employee.find({ email: req.params["employeeEmail"] });
        res.status(200).send(employee);

    } catch (err) {
        console.log("Error find employee by email: " + req.params["employeeEmail"]);
        res.status(500).send(err);
    }

}
module.exports = {
    add_employee,
    get_employees_list,
    get_employees_by_id,
    get_employees_by_Email
}

