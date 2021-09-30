const { Email } = require('@material-ui/icons');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


// define Schema
var PurchaseSchema = new Schema({
	productId: {
		type: Schema.Types.String,
		required: 'Product ID is required'
	},
    clientId: {
		type: String,
		required: 'Client ID is required'
	},
	totalPrice: {
		type: Number,
		required: 'Total price is required',
	},
	date: {
		type: Date,
        required: false,
	},
	employeeId: {
		type: Schema.Types.String,
		required: 'Employee ID is required'
	}
});

module.exports = mongoose.model('parchases', PurchaseSchema); 

