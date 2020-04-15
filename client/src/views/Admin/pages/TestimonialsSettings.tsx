import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Grid,
    Divider,
    Button,
    ButtonGroup,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useAdminTestimonialSettings } from "../../../hooks";
import "../../Testimonials/Testimonials.css";
// import SocialMediaReviews from "./SocialMediaReviews";
import moment from "moment";

const TestimonialsSettings: React.FC = () => {
    const testimonialSettings = useAdminTestimonialSettings();

    useEffect(() => {
        // if (testimonialSettings.loading) return;

        testimonialSettings.getTestimonialList();
        // console.log(testimonialSettings);
    }, []);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
            }}
        >
            <header className="__admin_header">
                <h1>Testimonials</h1>
            </header>
            <div>
                <Grid
                    container
                    spacing={2}
                    justify="flex-start"
                    direction="row"
                    alignItems="center"
                >
                    {/* {data.map((testimonial: any) => {
                        const temp = moment(testimonial.createdAt).format("L");
                        // console.log(testimonial);
                        return (
                            <Grid key={testimonial._id} md={4} item>
                                <Card elevation={3} className="card">
                                    <CardHeader
                                        avatar={
                                            <img
                                                src={
                                                    testimonial.profilePic ||
                                                    "https://d3kqdc25i4tl0t.cloudfront.net/articles/content/92_408268_151204profilepicture_hero.jpg"
                                                }
                                                alt={
                                                    testimonial.name || "random"
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
                    })} */}
                </Grid>
            </div>
        </div>
    );
};

export default TestimonialsSettings;
