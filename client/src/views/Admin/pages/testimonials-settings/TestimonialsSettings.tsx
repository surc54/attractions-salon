import React, { useState, useEffect } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Rating from "@material-ui/lab/Rating";

import { useAdminTestimonialSettings } from "../../../../hooks";
import "../../../Testimonials/Testimonials.css";
// import SocialMediaReviewsSettings from "./SocialMediaReviewsSettings";
import moment from "moment";

const TestimonialsSettings: React.FC = () => {
    const testimonialSettings = useAdminTestimonialSettings();
    // const [page, setPage] = useState(2);

    const refresh = () => {
        testimonialSettings.getTestimonialList();
    };

    useEffect(() => {
        testimonialSettings.getTestimonialList();
    }, []);

    const data = testimonialSettings.Testimonials;
    // console.log(data);

    const page1 = (
        <div>
            {/* <ButtonGroup variant="text" color="primary" fullWidth size="large">
                <Button onClick={() => setPage(1)}>Testimonials</Button>
                <Button onClick={() => setPage(2)}>Social Media Reviews</Button>
            </ButtonGroup> */}
            <header className="__admin_header">
                <h1>Testimonials</h1>
                <span className="spacer"></span>

                <Typography variant="button">
                    Last Loaded:{" "}
                    {!testimonialSettings.lastLoadTime
                        ? "Never"
                        : testimonialSettings.lastLoadTime.toLocaleTimeString()}
                </Typography>

                {testimonialSettings.loading ? (
                    <CircularProgress size={24} />
                ) : (
                    <Tooltip title="Refresh">
                        <IconButton onClick={refresh}>
                            <Icon>refresh</Icon>
                        </IconButton>
                    </Tooltip>
                )}
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

    // const page2 = (
    //     <div>
    //         <ButtonGroup variant="text" color="primary" fullWidth size="large">
    //             <Button onClick={() => setPage(1)}>Testimonials</Button>
    //             <Button onClick={() => setPage(2)}>Social Media Reviews</Button>
    //         </ButtonGroup>
    //         <SocialMediaReviewsSettings />
    //     </div>
    // );

    // switch (page) {
    //     case 1:
    //         return page1;
    //     case 2:
    //         return page2;
    //     default:
            return page1;
    // }
};

export default TestimonialsSettings;
