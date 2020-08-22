const mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      Comment    = require("./models/comment"),
      data       = [
        {
            name: "Canopy Tribes",
            image: "https://static.tripzilla.com/thumb/3/6/37942_700x.jpg",
            price: "50",
            location: "Kota Tinggi, Johor",
            country: "Malaysia",
            description: "Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature.",
            author: {
                id : "588c2e092403d111454fff76",
                username: "Jia Xin"
            }
        },
        {
            name: "Payung Getaway",
            image: "https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&h=350",
            price: "80",
            location: "Cherating, Pahang",
            country: "Malaysia",
            description: "Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature.",
            author: {
                id : "588c2e092403d111454fff71",
                username: "Wen Ruo"
            }
        },
        {
            name: "LongSha",
            image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
            price: "60",
            location: "Kapas Island, Terrenganu",
            country: "Malaysia",
            description: "Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature. Wake up to a beautiful view of the nature.",
            author: {
                id : "588c2e092403d111454fff77",
                username: "Mei Li"
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