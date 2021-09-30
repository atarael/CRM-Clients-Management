const Employee = require('../models/employee_model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const employees = [
    {
        "employee_id": 1,
        "first_name": "Rowe",
        "last_name": "Shallo",
        "email": "rshallo0@yellowpages.com",
        "password": "gagIr0xQPN",
        "image": "https://i.pinimg.com/originals/f4/fa/98/f4fa98e899b1f9b6e19a0c9d8166a28d.jpg",
        "about": "Customer support",
        "phone_number": "054-563-9177"
    }, {
        "employee_id": 2,
        "first_name": "Netty",
        "last_name": "Kenward",
        "email": "nkenward1@nih.gov",
        "password": "KIHioKSgF0",
        "image": "https://i.pinimg.com/236x/2d/eb/c6/2debc6df77839567be9b3746b64a90c1.jpg",
        "about": "GIS Technical Architect",
        "phone_number": "054-563-9177"
    }, {
        "employee_id": 3,
        "first_name": "Zorine",
        "last_name": "Cafferky",
        "email": "zcafferky2@virginia.edu",
        "password": "VOpJus",
        "image": "https://i.pinimg.com/236x/cf/d9/77/cfd97768ee6e01a8d63117232e5fb79b.jpg",
        "about": "Nuclear Power Engineer",
        "phone_number": "054-563-9177"
    }, {
        "employee_id": 4,
        "first_name": "Juanita",
        "last_name": "Haselhurst",
        "email": "jhaselhurst3@census.gov",
        "password": "rlbtLMt7R",
        "image": "https://i.pinimg.com/564x/81/14/d2/8114d23a0e1a896a07b659de51479bc9.jpg",
        "about": "Programmer II",
        "phone_number": "054-563-9177"
    }, {
        "employee_id": 5,
        "first_name": "Florella",
        "last_name": "Ells",
        "email": "fells4@elpais.com",
        "password": "ec04L3Ie",
        "image": "https://i.pinimg.com/236x/81/78/63/817863b89a15c8028c68b84dabe77bad.jpg",
        "about": "VP Sales",
        "phone_number": "054-563-9177"
    }, {
        "employee_id": 6,
        "first_name": "Marlee",
        "last_name": "Langham",
        "email": "mlangham5@icq.com",
        "password": "TRrun37",
        "image": "https://i.pinimg.com/236x/e6/c9/65/e6c965610bf56cf394868e2ff864f512.jpg",
        "about": "Assistant Manager",
        "phone_number": "054-563-9177"
    }, {
        "employee_id": 7,
        "first_name": "Pavlov",
        "last_name": "Mingotti",
        "email": "pmingotti6@i2i.jp",
        "password": "B6YzGVQPL",
        "image": "https://i.pinimg.com/236x/72/99/03/7299034c6c99d106306c3e289d7ab4d4.jpg",
        "about": "Help Desk Operator",
        "phone_number": "054-563-9177"
    }, {
        "employee_id": 8,
        "first_name": "Jojo",
        "last_name": "Fardon",
        "email": "jfardon7@mac.com",
        "password": "e1apR5vloQcf",
        "image": "https://i.pinimg.com/236x/c8/77/45/c8774558f3b101a4c7016bb6fe742546.jpg",
        "about": "Senior Cost Accountant",
        "phone_number": "054-563-9177"
    }, {
        "employee_id": 9,
        "first_name": "Lin",
        "last_name": "Bladesmith",
        "email": "lbladesmith8@baidu.com",
        "password": "SSp1wi",
        "image": "https://i.pinimg.com/236x/68/21/89/6821895affdd7f10729ca1b3534eeec9.jpg",
        "about": "Programmer II",
        "phone_number": "054-563-9177"
    }, {
        "employee_id": 10,
        "first_name": "Florida",
        "last_name": "Aicken",
        "email": "faicken9@multiply.com",
        "password": "GbZsEPfSgG",
        "image": "https://i.pinimg.com/236x/68/21/89/6821895affdd7f10729ca1b3534eeec9.jpg",
        "about": "VP Accounting",
        "phone_number": "054-563-9177"
    }
]
const login = async (req, res) => {
    console.log("Login:\nusername: " + req.body.username + " \npassword: " + req.body.password);
    try {
        const result = await Employee.find({ $and: [{ email: req.body.username }, { password: req.body.password }] });

        if (result.length > 0) {
            const token = jwt.sign({ username: req.body.username, password: req.body.password }, '123abc');
            res.status(200).send({
                token: token
            });

        } else {
            console.log("Login error \nEmployee not found");
            res.status(400).send("Error: Login fail \nEmployee not found");
        }



    } catch (err) {
        console.log("login error" + err);
        res.status(400).send("Error: " + err);
    }

}

const getUserDetails = async (req, res) => {

    try {
        const details = await jwt.verify(req.params.token, '123abc');
        console.log(details);
        res.send({ details }); 
    } catch {

        console.log("Error verify token");
    }


}
module.exports = { login, getUserDetails }