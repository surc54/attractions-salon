import React, { useState } from "react";
import {
    Divider,
    Button,
    ButtonGroup,
    TextField,
    TextareaAutosize,
} from "@material-ui/core";
import { getServices } from "../../../actions/serviceActions";

const UserSettings: React.TA = () => {
    const [pageNum, setPageNum] = useState(0);
    const [initialLoad, setInitialLoad] = useState(true);
    const [serviceInfo, setServiceInfo] = useState([]);

    return (
        <>
            {doInitialLoad(initialLoad, setInitialLoad, setServiceInfo)}
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

            {getChoiceView(pageNum, serviceInfo)}
        </>
    );
};

const getChoiceView = (pageNum, serviceInfo) => {
    switch (pageNum) {
        case 0:
            return <ServiceCreationForm />;
        case 1:
            return <ServiceUpdateView services={serviceInfo} />;
        case 2:
            return <ServiceDeleteView services={serviceInfo} />;
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

const ServiceUpdateView = ({ services }) => {
    return (
        <div style={{ height: "90%" }}>
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
            <div style={{ height: "100%", overflow: "auto" }}>
                {services.map((item) => {
                    return (
                        <div>
                            {item.groupName}
                            {item.name}
                            {item.subtitle}${item.price}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ServiceDeleteView = ({ services }) => {
    return (
        <div style={{ height: "90%" }}>
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
            <div style={{ height: "100%", overflow: "auto" }}>
                {services.map((item) => {
                    return (
                        <div>
                            {item.groupName}
                            {item.name}
                            {item.subtitle}${item.price}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ServicesForm = () => {
    return (
        <>
            <div>
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
            </div>

            <div>
                <TextField
                    label="Service Price"
                    placeholder="Ex: 0"
                    variant="outlined"
                    autoComplete="off"
                    style={{ margin: "10px" }}
                    required
                />

                <TextField
                    label="Subtitle"
                    placeholder="Ex: Not sold alone"
                    variant="outlined"
                    autoComplete="off"
                    style={{ margin: "10px" }}
                />

                <TextField
                    label="Image URL"
                    placeholder="Experimenting for local"
                    variant="outlined"
                    autoComplete="off"
                    style={{ margin: "10px" }}
                />
            </div>

            <TextareaAutosize
                rowsMin={4}
                style={{ margin: "10px" }}
                placeholder="Enter longer description here"
                style={{ width: "50%", margin: "10px" }}
            />
        </>
    );
};

const doInitialLoad = (initialLoad, setInitialLoad, setServiceInfo) => {
    if (initialLoad) {
        setInitialLoad(false);
        updateServices(setServiceInfo);
    }
};

const updateServices = (setServiceInfo) => {
    getServices()
        .then((value) => setServiceInfo(value))
        .catch((reason) => console.log(reason));
};

export default UserSettings;
