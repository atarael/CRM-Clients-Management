const { Email } = require('@material-ui/icons');
const mongoose = require('mongoose');
const { string } = require('prop-types');
var Schema = mongoose.Schema;

var minuteFromNow = function(){
    var timeObject = new Date();
    timeObject.setTime(timeObject.getTime() + 1000 * 60);
    return timeObject;
};
// define Schema
var ClientSchema = new Schema({
	client_id: {
		type: String,
	//	required: 'ID is required',
		unique: true
	},
	first_name: {
		type: String,
		//required: 'First Name is required'
	},
    last_name: {
		type: String,
		//required: 'Last Name is required'
	},
	phone_number: {
		type: String,
	//	required: 'Phone Number is required',
		//validate: [validateType, 'Please fill a valid type(people/nature), default type is nature)']
	},
	email: {
		type: String,
        //type: Email,
       // required: false,
        //validate: [ isEmail, 'Invalid email' ]
	},
    gender: {
        type: String, 
        enum : ['Male','Female'],
        default: 'Male'
    },
	year_of_birth: {
		type: String,
		// range: {
		// 	min: 1940,
		// 	max: 2021
		// }
	},
    start_connection_date: {
        type: Date, 
        default: minuteFromNow
    }
});

module.exports = mongoose.model('client', ClientSchema); 

