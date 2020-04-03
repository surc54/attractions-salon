import React, { useState } from "react";
import { Divider, Button, ButtonGroup, TextField } from "@material-ui/core";

const UserSettings: React.FC = () => {
    const [pageNum, setPageNum] = useState(0);

    return (
        <>
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "20px",
                    }}
                >
                    <ButtonGroup variant="contained" color="primary">
                        <Button onClick={() => setPageNum(0)}>
                            Approve New Testimonial
                        </Button>
                        <Button onClick={() => setPageNum(1)}>
                            Add New Social Media Review
                        </Button>
                        <Button onClick={() => setPageNum(2)}>
                            Delete Testimonials/Reviews
                        </Button>
                    </ButtonGroup>
                    <Divider orientation="horizontal" />
                </div>

                {getChoiceView(pageNum)}
            </div>
        </>
    );
};

const getChoiceView = (pageNum: number) => {
    switch (pageNum) {
        case 0:
            return <TestimonialApprovalForm />;
        case 1:
            return <SocialMediaApprovalForm />;
        case 2:
            return <ReviewsDeleteView />;
        default:
            return "Unknown pageView";
    }
};

const TestimonialApprovalForm = () => {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ marginBottom: "4px" }}>Approve New Testimonial</h3>
                <Button>Approve</Button>
            </div>
            <Divider orientation="horizontal" />
            <p>
                New Testimonials that are submitted will be added to this
                list...
            </p>
        </div>
    );
};

const SocialMediaApprovalForm = () => {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ marginBottom: "4px" }}>
                    Add New Social Media Review
                </h3>
                <Button>Add</Button>
            </div>
            <Divider orientation="horizontal" />
            <p>
                This is where you will be able to enter a embedded link to add a
                social media review.
            </p>
            <TextField
                label="Enter URL here"
                fullWidth
                autoComplete="off"
                variant="outlined"
            />
        </div>
    );
};

const ReviewsDeleteView = () => {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ marginBottom: "4px" }}>
                    Delete Testimonials/Reviews
                </h3>
                <Button>Delete</Button>
            </div>
            <Divider orientation="horizontal" />
            <p>
                All testimonials and reviews posted on the main page will be
                shown as a list here.
            </p>
        </div>
    );
};

export default UserSettings;
