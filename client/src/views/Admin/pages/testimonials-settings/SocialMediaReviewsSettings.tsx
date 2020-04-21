import React from "react";
import {
    TextField,
    Typography,
    CircularProgress,
    Tooltip,
    IconButton,
    Icon,
    Button,
    GridList,
    GridListTile,
    GridListTileBar,
} from "@material-ui/core";
import axios from "axios";

const tempSocialMediaReviews = [
    {
        id: 1,
        URL:
            "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FKiaraDomoniqueHall%2Fposts%2F2130098113893798%3A0&width=500",
        width: "500",
        height: "329",
        scrolling: "no",
        frameborder: "0",
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
        allow: "encrypted-media",
    },
];

// axios.post("/api/social-media-reviews", { tempSocialMediaReviews });

const SocialMediaReviewsSettings: React.FC = () => {
    return (
        <div>
            <header className="__admin_header">
                <h1>Google and Facebook Reviews</h1>
                <span className="spacer"></span>
            </header>
            <form style={{ marginBottom: "25px" }}>
                <TextField
                    autoFocus
                    autoComplete="off"
                    placeholder="Add Your Embedded Link Here..."
                    variant="outlined"
                    fullWidth
                    style={{ width: "85%", marginRight: "10px" }}
                    // value={search}
                    // onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    style={{ height: "54px", width: "13%", maxWidth: "100px" }}
                >
                    Submit
                </Button>
            </form>
            <GridList cellHeight="auto">
                {tempSocialMediaReviews.map((review) => {
                    return (
                        <GridListTile
                            key={review.id}
                            cols={1}
                            style={{ width: review.width }}
                        >
                            <GridListTileBar
                                titlePosition="top"
                                actionIcon={
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        style={{ marginRight: "10px" }}
                                    >
                                        Delete
                                    </Button>
                                }
                                // actionPosition="left"
                            />
                            <iframe
                                style={{
                                    border: "none",
                                    overflow: "hidden",
                                }}
                                title={review.URL}
                                src={review.URL}
                                width={review.width}
                                height={review.height}
                                scrolling={review.scrolling}
                                frameBorder={review.frameborder}
                                allow={review.allow}
                            />
                        </GridListTile>
                    );
                })}
            </GridList>
        </div>
    );
};

export default SocialMediaReviewsSettings;
