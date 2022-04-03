module.exports = (app, passport) => {
    app.get("/login", (req, res) => {
        res.send("login");
    });
    
    app.post("/register", passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/register",
        failureFlash: false
    }));

    // app.post("/register", (req, res) => {
        
    //     console.log(req);
    //     console.log(req.body.username);
    //     console.log(req.body.password);
    // });
};