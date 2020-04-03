import React from "react";
// import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Grid,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import "./Testimonials.css";
import SocialMediaReviews from "./SocialMediaReviews";
import AddTestimonial from "./AddTestimonial";

const tempTestimonials = [
    {
        id: 1,
        profilePic:
            "https://d3kqdc25i4tl0t.cloudfront.net/articles/content/92_408268_151204profilepicture_hero.jpg",
        name: "John",
        rating: 1,
        testimonial:
            "Fantastic, I'm totally blown away by Testimonial Generator.",
        date: "",
    },
    {
        id: 2,
        profilePic:
            "https://d3kqdc25i4tl0t.cloudfront.net/articles/content/92_408268_151204profilepicture_hero.jpg",
        name: "John",
        rating: 4,
        testimonial:
            "Fantastic, I'm totally blown away by Testimonial Generator.",
        date: "",
    },
    {
        id: 3,
        profilePic:
            "https://d3kqdc25i4tl0t.cloudfront.net/articles/content/92_408268_151204profilepicture_hero.jpg",
        name: "John",
        rating: 1,
        testimonial:
            "Fantastic, I'm totally blown away by Testimonial Generator.",
        date: "",
    },
    {
        id: 4,
        profilePic:
            "https://d3kqdc25i4tl0t.cloudfront.net/articles/content/92_408268_151204profilepicture_hero.jpg",
        name: "John",
        rating: 4,
        testimonial:
            "Fantastic, I'm totally blown away by Testimonial Generator.",
        date: "",
    },
    {
        id: 5,
        profilePic:
            "https://d3kqdc25i4tl0t.cloudfront.net/articles/content/92_408268_151204profilepicture_hero.jpg",
        name: "John",
        rating: 4,
        testimonial:
            "Fantastic, I'm totally blown away by Testimonial Generator.",
        date: "",
    },
    {
        id: 6,
        profilePic:
            "https://d3kqdc25i4tl0t.cloudfront.net/articles/content/92_408268_151204profilepicture_hero.jpg",
        name: "John",
        rating: 4,
        testimonial:
            "Fantastic, I'm totally blown away by Testimonial Generator.",
        date: "",
    },
];

const Testimonials = () => {
    return (
        <div className="body">
            <div>
                <Typography color="primary" variant="h4" className="title">
                    Testimonials
                </Typography>
                <AddTestimonial />
                <Grid
                    container
                    spacing={2}
                    justify="center"
                    direction="row"
                    alignItems="center"
                >
                    {tempTestimonials.map(testimonial => {
                        return (
                            <Grid key={testimonial.id} md={4} item>
                                <Card elevation={3} className="card">
                                    <CardHeader
                                        avatar={
                                            <img
                                                src={testimonial.profilePic}
                                                alt={testimonial.name}
                                                className="picture"
                                            />
                                        }
                                        action={
                                            <Rating
                                                value={testimonial.rating}
                                                className="ratings"
                                                readOnly
                                            />
                                        }
                                        title={testimonial.name}
                                        subheader="07/08/80"
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="body2"
                                            component="p"
                                        >
                                            {testimonial.testimonial}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
            <SocialMediaReviews />
        </div>
    );
};

// testimonials.propTypes = {};

export default Testimonials;
