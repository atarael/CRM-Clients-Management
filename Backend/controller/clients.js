var Client = require('../models/client_model');
var mongoose = require('mongoose');

const get_client_by_id = async (req, res) => {
    try {
        const client = await Client.find({ _id: req.params["clientId"] });
        console.log("get_client_by_id find, id:" + req.params["clientId"])
        res.status(200).send(client);
    }
    catch (err) {
        console.log("Error find client by id: " + req.params["clientId"]);
        res.status(500).send(err);
    }

}

const add_client = async (req, res) => {
    try {
        var new_client = new Client();
        //new_client.client_id = req.body.client_id
        new_client.first_name = req.body.first_name
        new_client.last_name = req.body.last_name
        new_client.phone_number = req.body.phone_number
        new_client.email = req.body.email
        new_client.gender = req.body.gender
        new_client.year_of_birth = req.body.year_of_birth
        new_client.start_connection_date = req.body.start_connection_date
        //save model to database
        await new_client.save();
        console.log("Save client details, new client:\n " + new_client);
        res.status(200);
    }
    catch (err) {
        console.log("Error save client details, new client:\n" + new_client + "\n" + err);
        res.status(500).send(err);
    }
}

const update_client = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params["clientID"], req.body, {
            new: true
        });
        console.log("update_client id: " + req.params["clientID"]);
        res.status(200).send(client);
    }
    catch (err) {
        console.log("Error update client details, id " + req.params["clientID"] + "\n" + err);
        res.status(500).send(err);
    }


}

const search_client = async (req, res) => {
    try {
        const client = await Client.find({ first_name: req.params["clientName"] });
        console.log("search_client name: " + req.params["clientName"]);
        res.status(200).send(client);
    }
    catch (err) {
        console.log("Error in searching client " + req.params["clientName"]);
        res.status(500).send(err);
    }
}

const get_last_clients = async (req, res) => {
    try {
        //query today up to tonight
        const last_clients = await Client.find({
            start_connection_date: {
                $gte: new Date((new Date().getTime() - (14 * 24 * 60 * 60 * 1000)))
            }
        });
        console.log("get_last_clients: \n" + last_clients);
        res.status(200).send(last_clients);

    } catch (err) {
        console.log("Error in searching last week new clients" + err);
        res.status(500).send(err);
    }
}

const month_distribution = async (req, res) => {
    const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    try {
        const data = await Client.aggregate([
            { "$match": { "start_connection_date": { $gte: new Date((new Date().getTime() - (356 * 24 * 60 * 60 * 1000))) } } },
            {
                "$group": {
                    "_id": { "month": { $substrCP: ["$start_connection_date", 0, 7] } },
                    "count": { $sum: 1 }
                }
            },
            { "$sort": { "_id.month": 1 } },
            {
                "$project": {
                    "_id": 0,
                    "count": 1,
                    "month": { $arrayElemAt: [monthsArray, { $subtract: [{ $toInt: { $substrCP: ["$_id.month", 5, 2] } }, 1] }] }
                }
            },
            {
                "$group": {
                    "_id": null,
                    "data": { $push: { k: "$month", v: "$count" } }
                }
            },
            {
                "$project": {
                    "data": { $arrayToObject: "$data" },
                    "_id": 0
                }
            }
        ]);
        console.log("month_distribution" + data);
        res.status(200).send(data);

    }
    catch (err) {
        console.log("Error in getting the month distribution" + err);
        res.status(500).send(err);
    }


}

const get_clients_list = async (req, res) => {
    try {
        const clients = await Client.find({});
        console.log("get_clients_list: found " + clients.length + " clients");
        res.status(200).send(clients);
    } catch (err) {
        console.log("Error in getting the clients list" + err);
        res.status(400).send("Error: " + err);
    }



}
module.exports = {
    add_client,
    get_client_by_id,
    update_client,
    search_client,
    get_last_clients,
    month_distribution,
    get_clients_list
}


