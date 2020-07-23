const express    = require("express"),
      router     = express.Router(),
      Campground = require("../models/campground"),
      Comment    = require("../models/comment"),
      middleware = require("../middleware");

// INDEX - display all campgrounds
router.get("/", (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
    const name   = req.body.name,
          price  = req.body.price,
          image  = req.body.image,
          desc   = req.body.description,
          author = {
              id: req.user._id,
              username: req.user.username
          },
          newCampground = {name: name, price: price, image: image, description: desc, author: author};
    // Create a new campground and save to DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err){
         console.log(err);   
        } else {
            // Redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// NEW - display form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// SHOW more info about 1 campground
router.get("/:id", (req, res) => {
    // Find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("back");   
        } else {
            console.log(foundCampground);
            // Render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT campground + middleware
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE campground
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    // Find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            res.redirect("/campgrounds");
        } else {
        // Redirect to show page
        res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});

// DESTROY campground
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    // Find campground to be deleted
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            // Remove all comments associated with this campground
            foundCampground.comments.forEach(comment => {
                Comment.findByIdAndRemove(comment._id, (err) => {
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Removed a comment");
                    }
                });
            });
        }
    });
    
    // Remove campground
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;