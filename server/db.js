const mongoose = require('mongoose');
// URLSlugs = require('mongoose-url-slugs'),
// passportLocalMongoose = require('passport-local-mongoose');

// User Schema, stores their username, password, and a
// reference to their (workout) log
const User = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
  	log: { type: mongoose.Schema.Types.ObjectId, ref: 'Log' }
});

// Entry Schema, represents an entry, with fields for
// title, date and description (main part of the entry)
const Entry = new mongoose.Schema({
	title: {type: String, required: true},
	date: {type: String, required: false},
	description: {type: String, required: true}
});

// Log Schema, represents a user's log, contains embedded
// entries, since user's will be able to see their
// entries all at once
const Log = new mongoose.Schema({
	items: [Entry]
});

// User.plugin(passportLocalMongoose);
// Log.plugin(URLSlugs('user'));
// Entry.plugin(URLSlugs('title'));

mongoose.model('User', User);
mongoose.model('Log', Log);
mongoose.model('Entry', Entry);


const mongooseOpts = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};
mongoose.connect('mongodb://localhost/traininglogs', mongooseOpts, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("connected to database");
	}
});