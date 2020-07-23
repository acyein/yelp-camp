const mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      Comment    = require("./models/comment"),
      data       = [
        {
            name: "Cloud's Rest",
            image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
            description: "Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature.",
            author: {
                id : "588c2e092403d111454fff76",
                username: "Jack"
            }
        },
        {
            name: "Desert Mesa",
            image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: "Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature.",
            author: {
                id : "588c2e092403d111454fff71",
                username: "Jill"
            }
        },
        {
            name: "Canyon Floor",
            image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: "Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature.",
            author: {
                id : "588c2e092403d111454fff77",
                username: "Jane"
            }
        },
    ]

function seedDB() {
    // Remove all campgrounds
    Campground.deleteMany({}, (err) => {
        if(err) {
            console.log(err);
        }
        console.log("Removed campgrounds!");
        // Remove all comments
        Comment.deleteMany({}, (err) => {
            if(err){
                console.log(err);
            }
            console.log("Removed comments!");
            // Add a few campgrounds
            data.forEach(seed => {
                Campground.create(seed, (err, campground) => {
                    if(err){s
                        console.log(err);
                    } else {
                        console.log("Added a campground");
                        // Create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was Internet",
                                author: {
                                    id : "588c2e092403d111454fff77",
                                    username: "Jane"
                                }
                            }, (err, comment) => {
                                if(err){
                                    console.log(err);
                                } else {        
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
}

module.exports = seedDB;