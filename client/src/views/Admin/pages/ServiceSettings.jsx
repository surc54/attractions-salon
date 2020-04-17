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
import { useServices } from "../../../hooks";

let serviceType = {
    groupName: "",
    name: "",
    price: 0,
    subtitle: "",
    description: "",
    imgURL: "",
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
    const test = {
        groupName: "test",
        name: "tes2",
        price: 100,
        subtitle: "test11",
        description: "test14",
        imgURL: "",
    }
    console.log("starting to add test service")
    addService(test);
    //if(newService){
    //    addService(newService);
    //}
    //else {
    //    // display snackbar (or something)
    //}
}

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
                <Button onClick={()=>{handleAdd(useService.addService, newService)}}>Submit</Button>
            </div>
            <Divider orientation="horizontal" />
            <div>
                <ServicesForm 
                    
                />
            </div>
        </div>
    );
};

const handleUpdate = (updateService, serviceID, newService) => {
    if(serviceID && newService){
        updateService(serviceID, newService);
    }
    else {
        // display snackbar (or something)
    }
}

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
                <Button onClick={() => handleUpdate(useService.updateService, serviceID, newService)}>Update</Button>
            </div>
            <Divider orientation="horizontal" />
            <div style={{ height: "100%", overflow: "auto" }}>
                <ServiceCards services={services} setServiceID={setServiceID} setNewService={setNewService}/>
            </div>
        </div>
    );
};

const handleDelete = (deleteService, serviceID) => {
    if(serviceID){
        //console.log("deleting");
        deleteService(serviceID);
    }
    else{
        ////////////////
    }
}

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
                <Button onClick={ () => {handleDelete(useService.deleteService, serviceID)} }>Delete</Button>
            </div>
            <Divider orientation="horizontal" />
            <div style={{ height: "100%", overflow: "auto" }}>
                <ServiceCards services={services} setID={setServiceID}/>
            </div>
        </div>
    );
};

const ServiceCards = ({ services, setID, setService, updating }) => {
    const classes = useStyles();
    return (
        <>
            <table className={classes.table}>
                <tbody>
                {services.map(
                    ({
                        name,
                        //imgURL,
                        groupName,
                        subtitle,
                        price,
                        _id,
                    }) => {
                        return (
                            <TableRow
                                className={classes.service}
                                key={_id}
                                hover
                            >
                                <td>{groupName}</td>
                                <td>{name}</td>
                                <td className={classes.subtitle}>{subtitle}</td>
                                <td className={classes.price}>${price}</td>
                            </TableRow>
                        );
                    }
                )}
                </tbody>
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
