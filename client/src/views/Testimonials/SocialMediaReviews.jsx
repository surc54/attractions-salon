import React from "react";
import { Typography, GridList, GridListTile } from "@material-ui/core";

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

const SocialMediaReviews = () => {
    return (
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
                {tempSocialMediaReviews.map((review) => {
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

export default SocialMediaReviews;
