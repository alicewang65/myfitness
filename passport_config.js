const mongoose = require("mongoose");
const User = mongoose.model("User");
const argon2 = require("argon2");

const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
    // config username/passoword authentication
    passport.use(new LocalStrategy((username, password, done) => {
        // console.log("local strategy");

        User.find({ "username" : username}, async (err, user) => {
            // console.log("user.....");

            if (err) {
                return done(err);
            } else if (user.length === 0) {
                return done(null, false);
            } else {
                if (await argon2.verify(user[0].password, password)) {
                    // console.log("verify");
                    // console.log(user[0]);
                    return done(null, user[0]);
                }
                return done(null, false);
            }
        });
    })); 

    // config session management
    passport.serializeUser((user, done) => {
        // console.log("serialize");
        // console.log(user.id);
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        // console.log("deserialize");
        User.findById(id, (err, user) => {
            // console.log("user");
            // console.log(user);
            done(err, user);
        });
    }); 
};