const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

router.post('/', (req, res) => {
	const { ticket, mimid, description, cause } = req.body;
	const newIssue = new Issue({ ticket, mimid, description, cause });
	newIssue
		.save()
		.then(res.redirect('/'))
		.catch((err) => console.log(err));
});

module.exports = router;
