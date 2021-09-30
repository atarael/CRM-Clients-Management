const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define Schema
var CallSchema = new Schema({
	client_id: {
		type: Schema.Types.String,
		required: 'client ID is required'
	},
	date: {
		type: Date,
		required: ''
	},
    subject: {
		type: String,
		required: ''
	},
	description: {
		type: String,
		required: '',
	},
    purchasedProducts: {
		type: [JSON],
	}
});

module.exports = mongoose.model('call', CallSchema); 

