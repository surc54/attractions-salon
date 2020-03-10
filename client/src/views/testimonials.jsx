import React from "react";
// import PropTypes from "prop-types";
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Typography,
} from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";

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
        <div style={styles.body}>
            <Typography color="primary" variant="h4" style={styles.title}>
                Testimonials
            </Typography>
            <Button style={styles.button} variant="contained" color="primary">
                Add Your Testimonial
            </Button>
            <div>
                {tempTestimonials.map(testimonial => {
                    return (
                        <Card
                            key={testimonial.id}
                            elevation={3}
                            style={styles.paper}
                        >
                            <CardHeader
                                avatar={
                                    <img
                                        src={testimonial.profilePic}
                                        alt={testimonial.name}
                                        style={styles.picture}
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
                    );
                })}
            </div>
        </div>
    );
};

const styles = {
    body: {
        margin: "100px 50px",
    },
    title: {
        fontFamily: "Pacifico, sans-serif",
        display: "inline-block",
    },
    button: {
        float: "right",
    },
    paper: {
        width: "400px",
        margin: "50px 50px 50px 0px",
    },
    picture: {
        width: "40px",
        height: "40px",
        borderRadius: "3px",
        margin: "10px",
    },
};

// testimonials.propTypes = {};

export default testimonials;
