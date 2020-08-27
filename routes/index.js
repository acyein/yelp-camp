require("dotenv").config();
const express   = require("express"),
      router    = express.Router(),
      passport  = require("passport"),
      User      = require("../models/user"),
      adminCode = process.env.ADMIN_CODE;

// ROOT
router.get("/", (req, res) => {
    res.render("landing");
});

// REGISTER user
// Show register form
router.get("/register", (req, res) => {
    res.render("register", {page: "register"});
});

// Handle sign up logic
router.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    // Make user admin if code is correct
    if(req.body.adminCode === adminCode) {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            req.flash("error", `${err.message}.`);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", `Welcome to YelpCamp, ${user.username}!`);
            res.redirect("/campgrounds");
        });
    });
});

// LOGIN user
// Show login form
router.get("/login", (req, res) => {
    res.render("login", {page: "login"});
});

// Handle login logic + middleware
router.post("/login", passport.authenticate("local",   
    {
        failureRedirect: "/login"
    }), (req, res) => {
        var redirectTo = req.session.redirectTo || "/";
        delete req.session.redirectTo;
        res.redirect(redirectTo);
});

// LOGOUT user
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;