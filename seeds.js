const mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      Comment    = require("./models/comment"),
      data       = [
        {
            name: "Sumbiling Eco Village",
            image: "https://scontent.fbwn2-1.fna.fbcdn.net/v/t1.0-9/118215829_1568034320036002_2509418152836640645_n.jpg?_nc_cat=108&_nc_sid=8bfeb9&_nc_ohc=VBwP4tM4UtIAX9MTMPq&_nc_ht=scontent.fbwn2-1.fna&oh=5e633413eb70c3e195869e88e8f07a13&oe=5F6A3453",
            price: "BND 168",
            location: "Batang Duri, Temburong",
            country: "Brunei",
            description: "Sumbiling Eco Village is a nature lodge situated in the interior of the Temburong District, home to some of the best preserved rainforests in Borneo. Due to our location, we are within reach of the popular Ulu Temburong National Park as well as other well-preserved rainforest areas, yet just 5 mins walk to the main road, 25 mins drive from Bangar (Temburong's main town), and around 2 hours by boat and drive from the Brunei International Airport. A rustic stay awaits you, as our lodge is surrounded by shady trees and new growth forests, and is located right on the banks of an upstream stretch of the Temburong River, with rocky rapids, and clear water depending on the rainfall. We try our best to keep structures to a minimum, with huts built from bamboo as well as reused and new wood being the main theme. On a typical day, while away the afternoons on cosy hammocks under shady trees beside the river, and take time to finish that intriguing novel you've never quite managed to finish. When the heat gets to you, the cooling waters of the river await, though if a mere cool dip doesn't do it, try a downstream float in a rubber tube, or try your hand at a traditional bamboo raft. Then as the sun sets, tune in to the symphony of the night, with the sounds of insects, frogs and other wildlife never too far away. This is the place to rest, relax and have some simple outdoors fun, especially if you have been worn out on the road for the last few weeks or months. For those who want more and whose budgets permit, we also conduct optional excursions, such as a night walking tour, or a daytrip either to the Ulu Temburong National Park or the Rainforest Discovery trek into the nearby rainforest, a hands-on see, smell, taste and feel educational trek for those who are interested in the numerous benefits of the rainforest to us. Despite the back-to-basics approach and our proximity to the rainforest, we provide a reasonably comfortable stay, with bedding in both rooms and tents, properly built-up bathrooms, with sitting toilets and even walled outdoor showers. Fans are found in the rooms as well as in the main hall. The bathrooms, rooms and main hall are lit-up at night, and there is no early lights out policy. Power points to charge electronics are available on request. We have a small resource corner, with maps, brochures, and books on various interests.",
            author: {
                id : "588c2e092403d111454fff76",
                username: "Jasmine"
            }
        },
        {
            name: "Gopeng Glamping Park",
            image: "https://static.wixstatic.com/media/82d6ba_37234ab50b1444418bf3859c2de6b007~mv2.jpg/v1/fill/w_664,h_499,fp_0.50_0.50,q_90/82d6ba_37234ab50b1444418bf3859c2de6b007~mv2.webp",
            price: "RM 158",
            location: "Gopeng, Perak",
            country: "Malaysia",
            description: "Surrounded by Hills, River, Caves and Forest; Gopeng Glamping Park offers an ideal and unique experience amidst the stunning views of nature, perfect for events such as romantic gateway or weekend gathering with family and friends. And also for team building, parties, retreats and festivals. Gopeng Glamping Park is a family-run glamorous outdoor camping experience; ensure you the friendliest hospitality at the comfort of your home. Bordered by the beautiful and calm village of Kampung Chulek, Gopeng as one of the best adventure-tourism hub in Malaysia, Our place offers a number of activity choices from the serene and relaxing retreat to a leisurely culture, heritage and historical activities to the most extreme & adventure activities for adrenaline junkies, Gopeng Glamping Park will surely cater the needs and preferences of its guest. We took pride in our food, every meals was prepared and served with love and compassion for our guest. With variety of choices from local Malay food, oriental dish to western cuisine, we tried our best making sure our guest enjoy our food to their heart content.",
            author: {
                id : "588c2e092403d111454fff76",
                username: "Jia Xin"
            }
        },
        {
            name: "Tanakita Camp Site",
            image: "https://media-cdn.tripadvisor.com/media/photo-o/0d/ef/3d/39/at-night.jpg",
            price: "Rp 550,000",
            location: "Sukabumi, Java",
            country: "Indonesia",
            description: "Tanakita is a camping area, a place for adventure trips, education and training in the open. The location is at an altitude of 1,100 masl located at the foot of the mountain and directly adjacent to Mount Gede Pangrango National Park in Kadudampit District, Sukabumi Regency, famously known for being cooling and refreshing with average weather conditions of 20 - 22 °C (day) and 18 - 20°C (night)",
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