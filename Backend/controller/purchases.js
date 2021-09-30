
var Purchase = require('../models/purchase_model');
var mongoose = require('mongoose');
//add purchase
const add_purchase = async (req, res) => {

    var new_purchase = new Purchase();
    new_purchase.productId = req.body.productId
    new_purchase.clientId = req.body.clientId
    new_purchase.totalPrice = req.body.totalPrice
    new_purchase.date = req.body.date
    new_purchase.employeeId = req.body.employeeId

    //save model to database
    try {
        await new_purchase.save();
        console.log("add_purchase, adding the new purchase:\n" + new_purchase);
        res.status(200).send("purchase added succesfuly");
    }
    catch (err) {
        console.log("Error in adding the new purchase:\n" + new_purchase + "\n" + err);
        res.status(400).send(err);
    }


}

//get client purchase 
const get_client_purchase = async (req, res) => {
    try {
        const purchases = await Purchase.find({ clientId: req.params["clientId"] });
        console.log("get_client_purchase, success in searching client " + req.params["clientId"] + " purchase list");
        res.status(200).send(purchases);
    } catch (err) {
        console.log("Error get client purchases, id: " + req.params["clientId"]);
        res.status(500).send(err);
    }


}

//get purchaes from last week
const get_last_purchase = async (req, res) => {
    try {
        const purchases = await Purchase.find({ //query today up to tonight
            date: {
                $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
            }
        });
        console.log("get_last_purchase, Details of last purchase found successfuly: \n" + purchases);
        res.status(200).send(purchases);
    } catch (err) {
        console.log("Error in searching last purchase ");
        res.status(500).send(err);
    }


}

//month distribution
const month_distribution = async (req, res) => {
    const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    try {
        const data = await Purchase.aggregate([
            { "$match": { "date": { $gte: new Date((new Date().getTime() - (356 * 24 * 60 * 60 * 1000))) } } },
            {
                "$group": {
                    "_id": { "month": { $substrCP: ["$date", 0, 7] } },
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
        console.log("month_distribution, success in getting the month distribution");
        res.status(200).send(data);
    } catch (err) {
        console.log("error in getting the month distribution" + err);
        res.status(500).send(err);
    }



}

//day distribution
const day_distribution = async (req, res) => {
    console.log("========================= in day distribution =========================");
    const days = ['', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    try {
        const data = await Purchase.aggregate([
            { "$match": { "date": { $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) } } },
            {
                "$group": {
                    "_id": "$date",
                    "count": { $sum: 1 }
                }
            },
            { "$sort": { "_id": 1 } },
            {
                "$project": {
                    "_id": 0,
                    "count": 1,
                    "day": { $arrayElemAt: [days, { $dayOfWeek: "$_id" }] }
                }
            },
            {
                "$group": {
                    "_id": null,
                    "data": { $push: { k: "$day", v: "$count" } }
                }
            },
            {
                "$project": {
                    "data": { $arrayToObject: "$data" },
                    "_id": 0
                }
            }
        ]);
        console.log("day_distribution, success in getting the month distribution");
        res.status(200).send(data);
    } catch (error) {
        console.log("Error in getting the month distribution" + error);
        res.status(500).send(error);
    }


}

//product_distribution
const product_distribution = async (req, res) => {
    try {
        const data = await Purchase.aggregate([
            {
                "$group": {
                    "_id": { "product": "$productId" },
                    "count": { $sum: 1 }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "count": 1,
                    "product": "$_id.product"
                }
            },
            {
                "$group": {
                    "_id": null,
                    "data": { $push: { k: "$product", v: "$count" } }
                }
            },
            {
                "$project": {
                    "data": { $arrayToObject: "$data" },
                    "_id": 0
                }
            }
        ]);
        console.log("product_distribution, success in getting the product distribution");
        res.status(200).send(data);
    }
    catch (err) {
        {
            console.log("error in getting the product distribution");
            res.status(500).send(err);
        }

    }
}
module.exports = {
    add_purchase,
    get_client_purchase
    , get_last_purchase,
    month_distribution,
    day_distribution,
    product_distribution

}