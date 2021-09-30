const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const router = require('./route/api')
dotenv.config()
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const cors=require("cors");

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))

mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log('connect')
    }).catch(err => {
        console.log(err)
    })
app.use(bodyParser.json());


app.use('/', router);
app.listen(8080, () => {
    console.log("listen in port 8080!")
})
