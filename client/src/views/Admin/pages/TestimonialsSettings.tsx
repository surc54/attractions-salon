import React, { useEffect } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";

import Rating from "@material-ui/lab/Rating";
import { useAdminTestimonialSettings } from "../../../hooks";
import "../../Testimonials/Testimonials.css";
import moment from "moment";

const TestimonialsSettings: React.FC = () => {
    const testimonialSettings = useAdminTestimonialSettings();

    useEffect(() => {
        testimonialSettings.getTestimonialList();
    }, []);

    const data = testimonialSettings.Testimonials;
    // console.log(data);

    return (
        <div>
            <header className="__admin_header">
                <h1>Testimonials</h1>
            </header>
            <div>
                <List>
                    {data.length !== 0 ? (
                        data.map((testimonial) => {
                            const temp = (
                                <div
                                    style={{
                                        marginLeft: "5px",
                                        fontSize: "12px",
                                    }}
                                >
                                    Date posted:{" "}
                                    {moment(testimonial.createdAt).format(
                                        "lll"
                                    )}
                                </div>
                            );
                            return (
                                <div key={testimonial.id}>
                                    <ListItem divider>
                                        <ListItemText
                                            style={{ width: "0px" }}
                                            primary={testimonial.name}
                                            secondary={
                                                testimonial.approved
                                                    ? "Status: approved"
                                                    : "Status: not approved"
                                            }
                                        />
                                        <ListItemText
                                            disableTypography
                                            primary={
                                                <Rating
                                                    value={testimonial.rating}
                                                    className="ratings"
                                                    style={{ padding: "0px" }}
                                                    readOnly
                                                />
                                            }
                                            secondary={temp}
                                        />
                                        <ListItemSecondaryAction>
                                            <Button
                                                onClick={() => {
                                                    testimonialSettings.updateTestimonial(
                                                        testimonial._id,
                                                        testimonial
                                                    );
                                                }}
                                            >
                                                {testimonial.approved
                                                    ? "Disapprove"
                                                    : "Approve"}
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    testimonialSettings.deleteTestimonial(
                                                        testimonial._id
                                                    );
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>

                                    <ListItem divider>
                                        <ListItemText
                                            inset
                                            primary={testimonial.feedback}
                                        />
                                    </ListItem>
                                </div>
                            );
                        })
                    ) : (
                        <p>There are no testimonials</p>
                    )}
                </List>
            </div>
        </div>
    );
};

export default TestimonialsSettings;
