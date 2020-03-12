import React from "react";
// import PropTypes from "prop-types";
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Typography,
    Grid,
} from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";
import "./Testimonials.css";

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

const testimonials = props => {
    const stars = [];
    for (var i = 0; i < 5; i++) {
        stars.push(<StarRateIcon />);
    }

    return (
        <div className="body">
            <Typography color="primary" variant="h4" className="title">
                Testimonials
            </Typography>
            <Button className="button" variant="contained" color="primary">
                Add Your Testimonial
            </Button>
            <Grid container spacing={2}>
                {tempTestimonials.map(testimonial => {
                    return (
                        <Grid key={testimonial.id} lg={4} container item>
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
                                        <IconButton disabled>
                                            {stars.map((star, idx) => {
                                                return (
                                                    <div key={idx}>
                                                        <StarRateIcon
                                                            color={
                                                                idx >=
                                                                testimonial.rating
                                                                    ? "inherit"
                                                                    : "primary"
                                                            }
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </IconButton>
                                    }
                                    title={testimonial.name}
                                    subheader="07/08/80"
                                />
                                <CardContent>
                                    <Typography variant="body2" component="p">
                                        {testimonial.testimonial}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

// testimonials.propTypes = {};

export default testimonials;
