const { Email } = require('@material-ui/icons');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var minuteFromNow = function(){
    var timeObject = new Date();
    timeObject.setTime(timeObject.getTime() + 1000 * 60);
    return timeObject;
};

// define Schema
var ProductSchema = new Schema({
	price: {
		type: Number,
		required: 'Product price is required'
	},
    description: {
		type: String,
		required: 'Product description is required'
	},
	name: {
		type: String,
		required: 'Product name is required',
		//validate: [validateType, 'Please fill a valid type(people/nature), default type is nature)']
	},
	image: {
		type: String,
		required: 'Product image is required',
	},
	date: {
		type: Date,
        required: false,
	}
});

module.exports = mongoose.model('products', ProductSchema); 

