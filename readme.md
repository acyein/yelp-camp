# YelpCamp
A [site](https://yelpcamp-acyein.herokuapp.com/) showcasing various campgrounds in South-East Asia 

## Course Details
**Title**: [The Web Developer Bootcamp](https://github.com/acyein/the-web-developer-bootcamp)  
**Instructor**: Colt Steele  
**Medium**: [Udemy](https://www.udemy.com/course/the-web-developer-bootcamp/)  

## RESTful Routes in YelpCamp

### Campgrounds Routes  
| Name    | URL                   | Verb   | Description                             |
|---------|-----------------------|--------|-----------------------------------------|
| INDEX   | /campgrounds          | GET    | Display all campgrounds                 |
| NEW     | /campgrounds/new      | GET    | Display form to create a new campground |
| CREATE  | /campgrounds          | POST   | Add a new campground to database        |
| SHOW    | /campgrounds/:id      | GET    | Show more info about a campground       |
| EDIT    | /campgrounds/:id/edit | GET    | Display form to edit a campground       |
| UPDATE  | /campgrounds/:id      | PUT    | Update details about a campground       |
| DESTROY | /campgrounds/:id      | DELETE | Delete a campground                     |  
  
### Comments Routes  
| Name    | URL                                        | Verb   | Description                          |
|---------|--------------------------------------------|--------|--------------------------------------|
| NEW     | /campgrounds/:id/comments/new              | GET    | Display form to create a new comment |
| CREATE  | /campgrounds/:id/comments                  | POST   | Add a new comment to database        |
| EDIT    | /campgrounds/:id/comments/:comment_id/edit | GET    | Display form to edit a comment       |
| UPDATE  | /campgrounds/:id/comments                  | PUT    | Update a comment                     |
| DESTROY | /campgrounds/:id/comments                  | DELETE | Delete a comment                     |