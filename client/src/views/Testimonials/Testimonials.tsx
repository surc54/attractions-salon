import React, { useEffect } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Avatar,
    Grid,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import "./Testimonials.css";
// import SocialMediaReviews from "./SocialMediaReviews";
import AddTestimonial from "./AddTestimonial";
import axios from "axios";
import moment from "moment";

const tempTestimonials: any[] = [];

const Testimonials = () => {
    useEffect(() => {
        axios.get("/api/testimonial").then((response) => {
            response.data.data.map((testimonial: any) =>
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
                {tempTestimonials.length === 0 ? (
                    <Typography
                        variant="h6"
                        style={{ textAlign: "center", margin: "100px" }}
                    >
                        There are no testimonials.
                    </Typography>
                ) : null}
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
                                                <Avatar>
                                                    {testimonial.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </Avatar>
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
                        } else {
                            return null;
                        }
                    })}
                </Grid>
            </div>
            {/* <SocialMediaReviews /> */}
        </div>
    );
};

export default Testimonials;
