const mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs'),
	passportLocalMongoose = require('passport-local-mongoose');

const User = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
  	logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }]
});

const Entry = new mongoose.Schema({
	title: {type: String, required: true},
	date: {type: String, required: false},
	description: {type: String, required: true}
});

const Log = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	name: {type: String, required: true},
	items: [Entry]
});

User.plugin(passportLocalMongoose);
Log.plugin(URLSlugs('name'));

mongoose.model('User', User);
mongoose.model('Log', Log);
mongoose.model('Entry', Entry);
mongoose.connect('mongodb://localhost/journaldb');
