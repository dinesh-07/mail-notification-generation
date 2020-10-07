const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
	ticket: {
		type: String,
		required: true,
	},
	mimid: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	cause: {
		type: String,
		required: true,
	},
});

const Issue = mongoose.model('Issue', IssueSchema);
module.exports = Issue;
