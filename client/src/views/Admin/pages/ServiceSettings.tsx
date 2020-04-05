import React, { useState } from "react";
import {
    Divider,
    Button,
    ButtonGroup,
    TextField,
    TextareaAutosize,
    FormControlLabel,
    makeStyles,
    TableRow,
} from "@material-ui/core";
import { getServices } from "../../../actions/serviceActions";

const UserSettings: React.FC = () => {
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

const getChoiceView = (pageNum: number, serviceInfo: never[]) => {
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
            <div style={{ height: "100%", overflow: "auto" }}>
                <ServiceCards services={services} />
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
                <ServiceCards services={services} />
            </div>
        </div>
    );
};

const ServiceCards = ({ services }) => {
    const classes = useStyles();
    return (
        <>
            <table className={classes.table}>
                {services.map(
                    (item: {
                        name: string;
                        imgURL: string;
                        groupName: string;
                        subtitle: string;
                        price: number;
                    }) => {
                        return (
                            <TableRow
                                className={classes.service}
                                key={item.name}
                                hover
                            >
                                <td>{item.groupName}</td>
                                <td>{item.name}</td>
                                <td className={classes.subtitle}>
                                    {item.subtitle}
                                </td>
                                <td className={classes.price}>${item.price}</td>
                            </TableRow>
                        );
                    }
                )}
            </table>
        </>
    );
};

const ServicesForm = () => {
    return (
        <>
            <div>
                <FormControlLabel
                    control={
                        <TextField
                            placeholder="Ex: Hair Extensions"
                            variant="outlined"
                            autoComplete="off"
                            style={{ margin: "10px" }}
                            required
                        />
                    }
                    label="Group Name"
                    labelPlacement="start"
                />

                <FormControlLabel
                    control={
                        <TextField
                            placeholder="Ex: Locks"
                            variant="outlined"
                            autoComplete="off"
                            style={{ margin: "10px" }}
                            required
                        />
                    }
                    label="Service Name"
                    labelPlacement="start"
                />
            </div>

            <div>
                <FormControlLabel
                    control={
                        <TextField
                            variant="outlined"
                            autoComplete="off"
                            placeholder="Ex: $10"
                            style={{ margin: "10px", width: "90px" }}
                            required
                        />
                    }
                    label="Price"
                    labelPlacement="start"
                />

                <FormControlLabel
                    control={
                        <TextField
                            placeholder="Ex: Not sold alone"
                            variant="outlined"
                            autoComplete="off"
                            style={{ margin: "10px" }}
                        />
                    }
                    label="Subtitle"
                    labelPlacement="start"
                />

                <FormControlLabel
                    control={
                        <TextField
                            placeholder="Soon drag'n drop"
                            variant="outlined"
                            autoComplete="off"
                            style={{ margin: "10px" }}
                        />
                    }
                    label="Image URL"
                    labelPlacement="start"
                />
            </div>

            <TextareaAutosize
                rowsMin={4}
                placeholder="Enter longer description here"
                style={{ width: "50%", margin: "10px" }}
            />
        </>
    );
};

const doInitialLoad = (
    initialLoad: boolean,
    setInitialLoad,
    setServiceInfo
) => {
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

const useStyles = makeStyles({
    table: {
        width: "100%",
        tableLayout: "fixed",
    },
    service: {
        height: "40px",
    },
    subtitle: {
        overflow: "hidden",
    },
    price: {
        textAlign: "right",
    },
    spacer: {
        flex: "1 0",
    },
});

export default UserSettings;
