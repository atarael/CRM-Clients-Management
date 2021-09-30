const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define Schema
var TasktSchema = new Schema({
	content: {
		type: String,
		required: 'content is required'
	},
    employee_id: {
		type: Schema.Types.String,
		required: 'employee_id is required'
    }
});

module.exports = mongoose.model('tasks', TasktSchema); 

