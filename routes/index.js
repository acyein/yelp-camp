const { triggerAsyncId } = require("async_hooks");

require("dotenv").config();
const express    = require("express"),
      router     = express.Router(),
      passport   = require("passport"),
      User       = require("../models/user"),
      Campground = require("../models/campground"),
      adminCode  = process.env.ADMIN_CODE,
      async      = require("async"),
      nodemailer = require("nodemailer"),
      crypto     = require("crypto");

// ROOT
router.get("/", (req, res) => {
    res.render("landing");
});

// REGISTER user
// Show sign up form
router.get("/register", (req, res) => {
    res.render("register", {page: "register"});
});

// Handle sign up logic
router.post("/register", (req, res) => {
    const newUser = new User({ 
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email ,
        avatar: req.body.avatar
    });
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
        var redirectTo = req.session.redirectTo ? req.session.redirectTo : "/campgrounds";
        delete req.session.redirectTo;
        res.redirect(redirectTo);
});

// LOGOUT user
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "You are now logged out.");
    res.redirect("/campgrounds");
});

// FORGOT password
router.get("/forgot", (req, res) => {
    res.render("forgot");
});

router.post("/forgot", (req, res, next) => {
    async.waterfall([
        (done) => {
            crypto.randomBytes(20, (err, buf) => {
                let token = buf.toString("hex");
                done(err, token);
            });
        },
        (token, done) => {
            User.findOne({ email: req.body.email }, (err, user) => {
                console.log(`User's email: ${req.body.email}`);
                // If email doesn't match username
                if(!user) {
                    req.flash("error", "No account registered with that email address exists.");
                    return res.redirect("/forgot");
                }
                // If email matches username
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour to reset password

                user.save(err => {
                    done(err, token, user);
                });
            });
        },
        // Auto-send email
        (token, user, done) => {
            const smtpTransport = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "chianyein@gmail.com",
                    pass: process.env.GMAIL_PW
                }
            });
            const mailOptions = {
                from: "YelpCamp Admin <chianyein@gmail.com>",
                to: user.email,
                subject: "YelpCamp Password Reset",
                html:
                `<p>Dear ${user.username},<p>
                <p>You have requested the reset your password.<p>
                <p>Please click the following link, or paste it into your browser to complete the process:<p>
                <p>http://${req.headers.host}/reset/${token}<p>
                <p>If you did not initiate this request, please ignore this email and your password will remain unchanged.<p>
                <p>Thank you<p>
                <p>YelpCamp Team<p>`
            };
            // Sending the email
            smtpTransport.sendMail(mailOptions, (err) => {
                console.log("Email to reset password sent");
                req.flash("success", `An e-mail has been sent to ${user.email} with further instructions.`);
                done(err, 'done');
            });
        }
    ], err => {
        if(err) return next(err);
        res.redirect("/forgot");
    });
});

// RESET password + token
router.get("/reset/:token", (req, res) => {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
      if(!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/forgot");
      }
      res.render("reset", {token: req.params.token});
    });
  });
  
router.post("/reset/:token", (req, res) => {
    async.waterfall([
        done => {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
                if(!user) {
                    req.flash("error", "Password reset token is invalid or has expired.");
                    return res.redirect("back");
                }
                if(req.body.password === req.body.confirm) {
                    user.setPassword(req.body.password, err => {
                        // Reset token after setting new password
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(err => {
                            req.logIn(user, err => {
                                done(err, user);
                            });
                        });
                    })
                } else {
                    req.flash("error", "Passwords do not match.");
                    return res.redirect("back");
                }
            });
        },
        (user, done) => {
            const smtpTransport = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "chianyein@gmail.com",
                    pass: process.env.GMAIL_PW
                }
            });
            const mailOptions = {
                from: "YelpCamp Admin <chianyein@gmail.com>",
                to: user.email,
                subject: "Your password has been changed",
                html: 
                `<p>Hello ${user.username},<p>
                <p>This is a confirmation that the password for your account ${user.email} has been successfully changed.`
            };
            smtpTransport.sendMail(mailOptions, err => {
                req.flash("success", "Success! Your password has been changed.");
                done(err);
            });
        }
    ], err => {
        res.redirect("/campgrounds");
    });
});

// USER profile
router.get("/users/:id", (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if(err) {
            req.flash("error", "Something went wrong.");
            res.redirect("/campgrounds");
        }
        Campground.find().where("author.id").equals(foundUser._id).exec((err, campgrounds) => {
            if(err) {
                req.flash("error", "Something went wrong.");
                res.redirect("/campgrounds");
            }
            res.render("users/show", {user: foundUser, campgrounds: campgrounds});
        });
    });
});

module.exports = router;