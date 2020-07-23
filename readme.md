RESTful Routes in YelpCamp

name       url                          verb            desc.
-----------------------------------------------------------
<!-- Campgrounds -->
INDEX     /campgrounds                  GET             Display all campgrounds
NEW       /campgrounds/new              GET             Display form to create a new campground
CREATE    /campgrounds                  POST            Add new campground to DB
SHOW      /campgrounds/:id              GET             Show more info about 1 campground
EDIT      /campgrounds/:id/edit         GET
UPDATE    /campgrounds/:id/             PUT
DESTROY   /campgrounds/:id              DELETE

<!-- Comments -->
NEW       /campgrounds/:id/comments/new                 GET
CREATE    /campgrounds/:id/comments                     POST
EDIT      /campgrounds/:id/comments/:comment_id/edit    GET
DESTROY   /campgrounds/:id/comments                     DELETE

<!-- 
Array
const campgrounds = [
    {name: "Canopy Tribes, Johor", image: "https://static.tripzilla.com/thumb/3/6/37942_700x.jpg"},
    {name: "Payung Getaway, Pahang", image: "https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "LongSha, Terengganu", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Canopy Tribes, Johor", image: "https://static.tripzilla.com/thumb/3/6/37942_700x.jpg"},
    {name: "Payung Getaway, Pahang", image: "https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "LongSha, Terengganu", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Canopy Tribes, Johor", image: "https://static.tripzilla.com/thumb/3/6/37942_700x.jpg"},
    {name: "Payung Getaway, Pahang", image: "https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "LongSha, Terengganu", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"}
] -->