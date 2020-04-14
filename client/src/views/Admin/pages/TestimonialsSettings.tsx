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
import "../../Testimonials/Testimonials.css";
// import SocialMediaReviews from "./SocialMediaReviews";
import moment from "moment";

const TestimonialsSettings: React.FC = () => {

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
            }}
        >
            <ButtonGroup variant="contained" color="primary">
                <Button>Approve New Testimonial</Button>
                <Button>Add New Social Media Review</Button>
                <Button>Delete Testimonials/Reviews</Button>
            </ButtonGroup>
            <Divider orientation="horizontal" />
            <div>
                <Typography color="primary" variant="h4" className="title">
                    Testimonials
                </Typography>
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
