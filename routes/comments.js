const express    = require("express"),
      router     = express.Router({mergeParams: true}),
      Campground = require("../models/campground"),
      Comment    = require("../models/comment"),
      middleware = require("../middleware");

// NEW - display form to add comment
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err || !campground){
            req.flash("error", "Campground not found");
            return res.redirect("back");
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// CREATE - add comment to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
    // Look up campground by ID
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong...");
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                } else {
                    // Add username and ID to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // Save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Added a comment!");
                    res.redirect(`/campgrounds/${campground._id}`);
                }
            });
        }
    });
});

// EDIT comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    // Check campground ID is valid
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err || !foundCampground) {
            req.flash("error", "Campground not found");
            return res.redirect("back");
        }
        // If campground is valid
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err){
                res.redirect("back");
            } else {
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
            }
        });
    });
    
});

// UPDATE comment
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    // Find and update comment
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err){
            res.redirect("back");
        } else {
            // Redirect to show page
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })
});

// DESTROY comment
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});

module.exports = router;