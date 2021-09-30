var Call = require('../models/call_model');
var mongoose = require('mongoose');

const add_call = async (req, res) => {

    var new_call = new Call();
    new_call.client_id = req.body.clientId
    new_call.date = req.body.date
    new_call.subject = req.body.subject
    new_call.description = req.body.description
    new_call.purchasedProducts = req.body.purchasedProducts

    try { 
        //save model to database
        await new_call.save();
        console.log("add_call, call added succesfuly: \n" + new_call);
        res.status(200).send("Call added!");
    } catch (error) {
        console.log("error in adding the new call: \n" + new_call);
        res.status(400).send(err);
    }
   
   


}
const get_client_calls = async (req, res) => {
    try {
        const calls = await Call.find({ client_id: req.params["clientID"] });
        console.log("get_client_calls, calls of client with id: ", req.params["clientID"], " found successfult");
        res.status(200).send(calls);
    } catch (error) {
        console.log("find client_calls fail" + error);

        res.status(500).send(error);
    }



}

module.exports = {
    add_call, get_client_calls
}

