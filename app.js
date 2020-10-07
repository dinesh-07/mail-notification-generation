const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const URI = require('./cofig/Keys').URI;

const app = express();

// View engine setup
app.engine(
	'.hbs',
	exphbs({
		extname: '.hbs',
		exphbsdefaults: null,
	})
);
app.set('view engine', '.hbs');

// Connect to Mongo
mongoose
	.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('DB connected.'))
	.catch((err) => console.log(err));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', require('./routes/contact'));
app.use('/add', require('./routes/add'));
app.use('/mail', require('./routes/mail'));

app.listen(7001, () => console.log('Server started...'));
