const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

router.get('/', (req, res) => {
	let issueArray = [];
	Issue.find({})
		.then((issues) => {
			for (i in issues) {
				const { ticket, mimid, description, cause } = issues[i];
				issueArray.push({ ticket, mimid, description, cause });
			}
			res.render('contact', { issueArray });
		})
		.catch((err) => console.log(err));
});

module.exports = router;
