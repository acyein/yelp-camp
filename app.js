require("dotenv").config();
const express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      flash          = require("connect-flash"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      methodOverride = require("method-override"),
      Campground     = require("./models/campground"),
      Comment        = require("./models/comment"),
      User           = require("./models/user"),
      seedDB         = require("./seeds");

// Requiring routes
const indexRoutes      = require("./routes/index"),
      campgroundRoutes = require("./routes/campgrounds"),
      commentRoutes    = require("./routes/comments");

// const url = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp"
const url = "mongodb://localhost:27017/yelp_camp"
console.log(url);
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("Connected to DB!"))
.catch(error => console.log(error.message));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
seedDB();

// Passport configuration
app.use(require("express-session")({
    secret: "Voldemort dies!!!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// Port
app.listen(process.env.PORT || 3000, () => {
    console.log("The YelpCamp Server has started!");
});