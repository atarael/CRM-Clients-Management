var Task = require('../models/task_model');
var mongoose = require('mongoose');

//add new task
const add_task = async (req, res) => {
    var new_task = new Task();
    new_task.content = req.body.content
    new_task.employee_id = req.body.employee_id
    try {
        //save model to database
        await new_task.save();
        console.log("add_task, task added succesfuly:\n " + new_task);
        res.status(200).send("task added!");
    } catch (error) {
        console.log("error in adding the new task");
        res.status(400).send(err);
    }
    
}

//update_task
const update_task = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params["taskId"], req.body, {
            new: true
        });
        console.log("update_task, success in updating the details of task with id " + req.params["taskId"]);
        res.status(200).send(task);
    } catch (error) {
        console.log("Error in updating the details of task with id " + req.params["taskId"] + "\n" + error);
        res.status(500).send(err);
    }

}

//get_tasks_list
const get_tasks_list = async (req, res) => {
    try {
        const tasks = await Task.find({});
        console.log("get_tasks_list, tasks list found succesfuly");
        res.status(200).send(tasks);
    } catch (error) {
        console.log("error in getting the tasks list" + error);
        res.status(400).send("error in getting the tasks list" + error);
    }
}

//delete_task
const delete_task = async (req, res) => {
    try {
        await Task.remove({
            _id: req.params["taskId"]
        });
        console.log("delete_task, task removed succesfuly");
        res.status(200).send(result);
    } catch (error) {
        console.log("Error in removing the tasks list" + error);
        res.status(400).send("Error in removing the tasks list: " + error);
    }
}

module.exports = {
    add_task,
    update_task,
    get_tasks_list,
    delete_task
}