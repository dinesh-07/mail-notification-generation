const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const Issue = require('../models/Issue');

router.post('/', (req, res) => {
	Issue.find({}).then((issues) => {
		var output =
			'<p>Need your attention<p>' +
			'<table><thead><tr><th>Ticket</th><th>MIM ID</th><th>description</th><th>Cause</th></tr></thead><tbody>';
		output += issues
			.map((issue) => {
				const { ticket, mimid, description, cause } = issue;
				return `<tr><td>${ticket}</td>
			<td>${mimid}</td>
			<td>${description}</td>
			<td>${cause}</td>
			</tr>`;
			})
			.join('');
		output += '</tbody></table>';

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				type: 'OAuth2',
				user: 'dinesh.skini@gmail.com',
				clientId: '166502913877-ecgj09e85vrecohn3nm3a7hubtmv47rr.apps.googleusercontent.com',
				clientSecret: 'MHZoeZByY6ZvjoycKFW5CxcG',
				refreshToken:
					'1//04pxWrRR-sHpsCgYIARAAGAQSNwF-L9IryX36J5LHCxz35Z41793oJfexmZ8A_rr-nFpN4YLng7YL0IEIOcclSBozi-q31DPDIqA',
				accessToken:
					'ya29.a0AfH6SMBw9AkTc6yRwvScKSsc2GPSXhQ_jUXQFTxv34hzZnUjM8pS7ZWIqLo9Xz-QutGGGdSzuNutrQp1FA2b2oBKIjfl_Vxh7X4pTNxJPplWfp7No_6x9XSznZ7FXi7JOBCZq0Ld38YqX8pd5dWkhh38vo9-93lOlOE',
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		// setup email data with unicode symbols
		let mailOptions = {
			from: '"Nodemailer Contact" <dinesh.skini@gmail.com>', // sender address
			to: 'dinesh.skini@gmail.com', // list of receivers
			subject: 'Node Contact Request', // Subject line
			text: 'Hello world?', // plain text body
			html: output, // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log('Message sent: %s', info.messageId);
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

			res.redirect('/');
		});
	});
});

module.exports = router;
