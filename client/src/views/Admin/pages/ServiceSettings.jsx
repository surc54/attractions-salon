import React, { useState } from "react";
import {
    Divider,
    Button,
    ButtonGroup,
    TextField,
    TextareaAutosize,
    makeStyles,
    TableRow,
} from "@material-ui/core";
import { useServices } from "../../../hooks";

const serviceType = {
    groupName: "",
    name: "",
    price: 0,
    subtitle: "",
    description: "",
    imgURL: "",
    _id: "",
    __v: 0,
};

const ServiceSettings = () => {
    const [pageNum, setPageNum] = useState(0);
    const services = useServices();

    React.useEffect(() => {
        services.getServicesList();
    }, []);

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

            {getChoiceView(pageNum, services.services)}
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

const handleAdd = (addService, newService) => {
    //const test = {
    //    groupName: "test",
    //    name: "tes2",
    //    price: 100,
    //    subtitle: "test11",
    //    description: "test14",
    //    imgURL: "",
    //}
    console.log("starting to add test service");
    if (newService) {
        addService(newService);
    } else {
        // display snackbar (or something)
    }
};

const ServiceCreationForm = () => {
    const useService = useServices();
    const [newService, setNewService] = useState(serviceType);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ marginBottom: "4px" }}>Create a service</h3>
                <Button
                    onClick={() => {
                        handleAdd(useService.addService, newService);
                    }}
                >
                    Submit
                </Button>
            </div>
            <Divider orientation="horizontal" />
            <div>
                <ServicesForm
                    newService={newService}
                    setNewService={setNewService}
                />
            </div>
        </div>
    );
};

const handleUpdate = (updateService, serviceID, newService) => {
    if (serviceID && newService) {
        updateService(serviceID, newService);
    } else {
        // display snackbar (or something)
    }
};

const ServiceUpdateView = ({ services }) => {
    const useService = useServices();
    const [serviceID, setServiceID] = useState("");
    const [newService, setNewService] = useState(serviceType);

    return (
        <div style={{ height: "90%" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ marginBottom: "4px" }}>Update a service</h3>
                <Button
                    onClick={() =>
                        handleUpdate(
                            useService.updateService,
                            serviceID,
                            newService
                        )
                    }
                >
                    Update
                </Button>
            </div>
            <Divider orientation="horizontal" />
            <ServicesForm
                newService={newService}
                setNewService={setNewService}
            />
            <div style={{ height: "54vh", overflow: "auto" }}>
                <ServiceCards
                    services={services}
                    serviceID={serviceID}
                    setServiceID={setServiceID}
                    setNewService={setNewService}
                    updating={true}
                />
            </div>
        </div>
    );
};

const handleDelete = (deleteService, serviceID) => {
    if (serviceID) {
        //console.log("deleting");
        deleteService(serviceID);
    } else {
        ////////////////
    }
};

const ServiceDeleteView = ({ services }) => {
    const useService = useServices();
    const [serviceID, setServiceID] = useState("");

    return (
        <div style={{ height: "90%" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ marginBottom: "4px" }}>Delete a service</h3>
                <Button
                    onClick={() => {
                        handleDelete(useService.deleteService, serviceID);
                    }}
                >
                    Delete
                </Button>
            </div>
            <Divider orientation="horizontal" />
            <div style={{ height: "100%", overflow: "auto" }}>
                <ServiceCards
                    services={services}
                    serviceID={serviceID}
                    setServiceID={setServiceID}
                />
            </div>
        </div>
    );
};

const ServiceCards = ({
    services,
    serviceID,
    setServiceID,
    setNewService,
    updating,
}) => {
    const classes = useStyles();
    return (
        <>
            <table className={classes.table}>
                <tbody>
                    {services.map((s) => {
                        return (
                            <TableRow
                                className={classes.service}
                                key={s._id}
                                hover
                                onClick={() => {
                                    setServiceID(s._id);
                                    if (updating)
                                        setNewService({
                                            groupName: s.groupName,
                                            name: s.name,
                                            price: s.price,
                                            subtitle: s.subtitle,
                                            description: s.description,
                                            imgURL: s.imgURL,
                                            _id: s._id,
                                            __v: s.__v,
                                        });
                                }}
                                selected={serviceID === s._id}
                            >
                                <td>{s.groupName}</td>
                                <td>{s.name}</td>
                                <td className={classes.subtitle}>
                                    {s.subtitle}
                                </td>
                                <td className={classes.price}>${s.price}</td>
                            </TableRow>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

const ServicesForm = ({ newService, setNewService }) => {
    return (
        <>
            <TextField
                label="Group Name"
                placeholder="Ex: Hair Extensions"
                variant="outlined"
                autoComplete="off"
                value={newService.groupName}
                onChange={(e) => {
                    setNewService(
                        Object.assign({}, newService, {
                            groupName: e.target.value,
                        })
                    );
                }}
                style={{ margin: "10px" }}
                required
            />

            <TextField
                label="Service Name"
                placeholder="Ex: Locks"
                variant="outlined"
                autoComplete="off"
                value={newService.name}
                onChange={(e) => {
                    setNewService(
                        Object.assign({}, newService, { name: e.target.value })
                    );
                }}
                style={{ margin: "10px" }}
                required
            />

            <TextField
                label="Price"
                variant="outlined"
                autoComplete="off"
                placeholder="Ex: $10"
                value={newService.price}
                onChange={(e) => {
                    setNewService(
                        Object.assign({}, newService, { price: e.target.value })
                    );
                }}
                style={{ margin: "10px", width: "10vw" }}
                required
            />

            <TextField
                label="Subtitle"
                placeholder="Ex: Not sold alone"
                variant="outlined"
                autoComplete="off"
                value={newService.subtitle ? newService.subtitle : ""}
                onChange={(e) => {
                    setNewService(
                        Object.assign({}, newService, {
                            subtitle: e.target.value,
                        })
                    );
                }}
                style={{ margin: "10px" }}
            />

            <TextField
                label="Image URL"
                placeholder="Soon drag'n drop"
                variant="outlined"
                autoComplete="off"
                value={newService.imgURL}
                onChange={(e) => {
                    setNewService(
                        Object.assign({}, newService, {
                            imgURL: e.target.value,
                        })
                    );
                }}
                style={{ margin: "10px" }}
            />

            <TextareaAutosize
                rowsMin={4}
                placeholder="Enter longer description here"
                value={newService.description}
                onChange={(e) => {
                    setNewService(
                        Object.assign({}, newService, {
                            description: e.target.value,
                        })
                    );
                }}
                style={{ width: "100%", margin: "10px" }}
            />
        </>
    );
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

export default ServiceSettings;
