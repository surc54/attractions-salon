import React, { useState } from "react";
// import PropTypes from "prop-types";
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Typography,
    Grid,
    GridList,
    GridListTile,
    Dialog,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
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

const tempSocialMediaReviews = [
    {
        id: 1,
        URL:
            "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FKiaraDomoniqueHall%2Fposts%2F2130098113893798%3A0&width=500",
        width: "500",
        height: "329",
        scrolling: "no",
        frameborder: "0",
        allowTransparency: "true",
        allow: "encrypted-media",
    },
    {
        id: 2,
        URL:
            "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FGENUINELYSWEETS%2Fposts%2F10214005074193065&width=500",
        width: "500",
        height: "665",
        scrolling: "no",
        frameborder: "0",
        allowTransparency: "true",
        allow: "encrypted-media",
    },
];

const Testimonials = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="body">
            <div>
                <Typography color="primary" variant="h4" className="title">
                    Testimonials
                </Typography>
                <Button
                    className="button"
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                >
                    Add Your Testimonial
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent className="modal">
                        <div
                            style={{
                                backgroundColor: "#E7A1AF",
                                height: "50px",
                            }}
                        >
                            <DialogContentText className="modal-title">
                                Please describe your experience
                            </DialogContentText>
                        </div>
                        <div style={{ margin: "0px 20px" }}>
                            <TextField
                                autoFocus
                                label="Name"
                                variant="outlined"
                                required
                                margin="normal"
                            />
                            <Typography>
                                How would you rate your experience?
                            </Typography>
                            <Rating
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                className="ratings"
                                size="large"
                                style={{ marginBottom: "20px" }}
                            />
                            <Typography>
                                Have some feedback? You can write it here:
                            </Typography>
                            <TextField
                                multiline
                                label="Write Your feedback Here"
                                fullWidth
                                required
                                rows="8"
                                variant="outlined"
                                margin="normal"
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleClose}
                            color="primary"
                            variant="contained"
                            style={{ color: "white" }}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
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
            <div>
                <Typography
                    color="primary"
                    variant="h4"
                    className="title"
                    style={{ marginBottom: "20px" }}
                >
                    Social Media Reviews
                </Typography>
                <GridList cellHeight="auto">
                    {tempSocialMediaReviews.map(review => {
                        return (
                            <GridListTile
                                key={review.id}
                                cols={1}
                                style={{ width: "auto" }}
                            >
                                <iframe
                                    style={{
                                        border: "none",
                                        overflow: "hidden",
                                    }}
                                    src={review.URL}
                                    width={review.width}
                                    height={review.height}
                                    scrolling={review.scrolling}
                                    frameborder={review.frameborder}
                                    allowTransparency={review.allowTransparency}
                                    allow={review.allow}
                                />
                            </GridListTile>
                        );
                    })}
                </GridList>
            </div>
        </div>
    );
};

// testimonials.propTypes = {};

export default Testimonials;
