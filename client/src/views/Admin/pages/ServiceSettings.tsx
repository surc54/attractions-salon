import React, { useState } from "react";
import {
    Divider,
    Button,
    ButtonGroup,
    TextField,
    TextareaAutosize,
} from "@material-ui/core";

const UserSettings: React.FC = () => {
    const [pageNum, setPageNum] = useState(0);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                }}
            >
                <ButtonGroup variant="contained" color="primary">
                    <Button onClick={() => setPageNum(0)}>
                        Add a new service
                    </Button>
                    <Button onClick={() => setPageNum(1)}>
                        Update a service
                    </Button>
                    <Button onClick={() => setPageNum(2)}>
                        Delete a service
                    </Button>
                </ButtonGroup>
                <Divider orientation="horizontal" />
            </div>

            {getChoiceView(pageNum)}
        </>
    );
};

const getChoiceView = (pageNum: number) => {
    switch (pageNum) {
        case 0:
            return <ServiceCreationForm />;
        case 1:
            return <ServiceUpdateView />;
        case 2:
            return <ServiceDeleteView />;
        default:
            return "Unknown pageView";
    }
};

const ServiceCreationForm = () => {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ marginBottom: "4px" }}>Create a service</h3>
                <Button>Submit</Button>
            </div>
            <Divider orientation="horizontal" />
            <div>
                <ServicesForm />
            </div>
        </div>
    );
};

const ServiceUpdateView = () => {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ marginBottom: "4px" }}>Update a service</h3>
                <Button>Update</Button>
            </div>
            <Divider orientation="horizontal" />
            <ServicesForm />
            <p>
                Add services here like in the services page, allow to select one
                and prefill boxes above this, then when form is submitted,
                update selected service
            </p>
        </div>
    );
};

const ServiceDeleteView = () => {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ marginBottom: "4px" }}>Delete a service</h3>
                <Button>Delete</Button>
            </div>
            <Divider orientation="horizontal" />
            <p>
                Add services here like in the services page, allow to select
                one, then, delete selected service when form is submitted
            </p>
        </div>
    );
};

const ServicesForm = () => {
    return (
        <>
            <TextField
                label="Group Name"
                placeholder="Hair Extensions"
                variant="outlined"
                autoComplete="off"
                style={{ margin: "10px" }}
                required
            />

            <TextField
                label="Service Name"
                placeholder="Locks"
                variant="outlined"
                autoComplete="off"
                style={{ margin: "10px" }}
                required
            />

            <TextField
                label="Service Price"
                placeholder="10"
                variant="outlined"
                autoComplete="off"
                style={{ margin: "10px" }}
                required
            />

            <TextField
                label="Image URL"
                placeholder="Experimenting for local"
                variant="outlined"
                autoComplete="off"
                style={{ margin: "10px" }}
                required
            />

            <TextField
                label="Subtitle"
                placeholder="Not sold alone"
                variant="outlined"
                autoComplete="off"
                style={{ margin: "10px" }}
            />

            <TextareaAutosize
                rowsMin={4}
                style={{ margin: "10px" }}
                placeholder="Enter longer description here"
            />
        </>
    );
};

export default UserSettings;
