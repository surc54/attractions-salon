import React, { useEffect } from "react";
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
import axios from "axios";
import moment from "moment";

const tempTestimonials = [];

const Testimonials = () => {
    useEffect(() => {
        axios.get("/api/testimonial").then((response) => {
            response.data.data.map((testimonial) =>
                tempTestimonials.push(testimonial)
            );
        });
    }, []);

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
                    justify="flex-start"
                    direction="row"
                    alignItems="center"
                >
                    {tempTestimonials.map((testimonial, idx) => {
                        if (testimonial.approved) {
                            const temp = moment(testimonial.createdAt).format(
                                "L"
                            );
                            return (
                                <Grid key={idx} md={4} item>
                                    <Card elevation={3} className="card">
                                        <CardHeader
                                            avatar={
                                                <img
                                                    src={
                                                        testimonial.profilePic ||
                                                        "https://d3kqdc25i4tl0t.cloudfront.net/articles/content/92_408268_151204profilepicture_hero.jpg"
                                                    }
                                                    alt={
                                                        testimonial.name ||
                                                        "random"
                                                    }
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
                                            subheader={temp}
                                        />
                                        <CardContent>
                                            <Typography
                                                variant="body2"
                                                component="p"
                                            >
                                                {testimonial.feedback}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        }
                    })}
                </Grid>
            </div>
            <SocialMediaReviews />
        </div>
    );
};

// testimonials.propTypes = {};

export default Testimonials;
