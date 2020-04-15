import React, { useState } from "react";
import { makeStyles, Grid, Paper, CircularProgress } from "@material-ui/core";
//import { services } from "../../actions/serviceActions";
import ServiceWindow from "./ServiceWindow";
import { useServices } from "../../hooks/ServiceHooks";
import SideBar from "./SideBar";

import bgImg1 from "../../assets/bg-wave-1.png"
import bgImg2 from "../../assets/bg-wave-2.png"
import "./Services.css";

const Services = () => {
    const [initialLoad, setInitialLoad] = useState(true);
    const [serviceInfo, setServiceInfo] = useState([]);
    const [filterCat, setFilterCat] = useState("");
    const [filterText, setFilterText] = useState("");
    const theBigTEST = useServices(); 
    const classes = useStyles();

    return (
        <>
            {/** inefficient, should get modified */}
            {doInitialLoad(initialLoad, setInitialLoad, setServiceInfo, theBigTEST)}
            <div className={classes.window}>
                <Grid container spacing={0} className={classes.container}>
                    <Grid item xs={12} md={2}>
                        <Paper className={classes.sideBar} elevation={0}>
                            <SideBar
                                services={servicesJSON}
                                dummy={serviceInfo}
                                filterCat={filterCat}
                                filterText={filterText}
                                setFilterCat={setFilterCat}
                                setFilterText={setFilterText}
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={9}>
                        <Paper className={classes.serviceWindow} elevation={0}>
                            {initialLoad ? (
                                <>
                                    <p>loading</p>
                                    <CircularProgress />
                                </>
                            ) : (
                                <>
                                    <ServiceWindow
                                        services={servicesJSON}
                                        filterCat={filterCat}
                                        filterText={filterText}
                                    />
                                </>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <img
                src={bgImg1}
                alt="needBG1"
                style={{
                    position: "absolute",
                    bottom: "0",
                    width: "100%",
                    zIndex: "-1",
                }}
            />
            <img
                src={bgImg2}
                alt="needBG2"
                style={{
                    position: "absolute",
                    bottom: "0",
                    width: "100%",
                    zIndex: "-1",
                }}
            />
        </>
    );
};

const doInitialLoad = (initialLoad, setInitialLoad, setServiceInfo, theBigTEST) => {
    if (initialLoad) {
        setInitialLoad(false);
        updateServices(setServiceInfo);
        console.log(theBigTEST)
    }
};

const updateServices = (setServiceInfo) => {
    //getServices()
    //    .then((value) => setServiceInfo(value))
    //    .catch(() => setServiceInfo(servicesJSON));
};

const useStyles = makeStyles((theme) => ({
    window: {
        paddingTop: 64,
    },
    container: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    sideBar: {
        height: "auto",
        marginTop: 5,
    },
    serviceWindow: {
        height: "600px",
        marginTop: 5,
        overflow: "auto",
        scrollBehavior: "smooth",
        background: "transparent",
    },
}));

const servicesJSON = [
    {
        groupName: "Process Color",
        name: "Single Process Color",
        price: "55",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Process Color",
        name: "Single Process/Cut",
        price: "70",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Process Color",
        name: "Double Process Color",
        price: "85",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Process Color",
        name: "Double Process/Cut",
        price: "100",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },

    {
        groupName: "Highlights",
        name: "Full Highlights",
        price: "85",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Highlights",
        name: "Full Highlights/Cut",
        price: "100",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Highlights",
        name: "Partial Highlights",
        price: "65",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Highlights",
        name: "Partial Highlights/Cut",
        price: "80",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },

    {
        groupName: "Treatments",
        name: "Color Rinse",
        price: "25",
        description: "",
        subtitle: "(after relaxer)",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Treatments",
        name: "Relaxer",
        price: "65",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Treatments",
        name: "Relaxer/cut",
        price: "75",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Treatments",
        name: "Partial Relaxer",
        price: "35",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Treatments",
        name: "Partial Relaxer/Cut",
        price: "50",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Treatments",
        name: "Texturizer",
        price: "65",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Treatments",
        name: "Texturizer/Cut",
        price: "75",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Treatments",
        name: "Keratin Treatment",
        price: "200",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Treatments",
        name: "Keratin Treatment/Cut",
        price: "215",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },

    {
        groupName: "Hair Cuts",
        name: "Haircuts",
        price: "30",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair Cuts",
        name: "Haircut Blow-dry",
        price: "38",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair Cuts",
        name: "Men's Cut",
        price: "18",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair Cuts",
        name: "Kid's cut",
        subtitle: "10 and under",
        price: "15",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },

    {
        groupName: "Hair Care",
        name: "Shampoo",
        price: "20",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair Care",
        name: "Shampoo blow-dry",
        price: "30",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair Care",
        name: "Shampoo set",
        price: "30",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair Care",
        name: "Spiral set",
        price: "50",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair Care",
        name: "Natural blowouts",
        price: "75",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair Care",
        name: "Natural blowouts/cut",
        price: "85",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair Care",
        name: "Deep conditioners",
        price: "15",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair Care",
        name: "Flat Irons",
        price: "15",
        subtitle: "(Additional with any other hair service)(not sold alone)",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },

    {
        groupName: "Hair extensions",
        name: "Sew ins",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair extensions",
        name: "Ponytails",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair extensions",
        name: "Clip ins",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair extensions",
        name: "Locks ",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair extensions",
        name: "Crochet ",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair extensions",
        name: "Braids",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Hair extensions",
        name: "Sisterlock",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },

    {
        groupName: "Waxing",
        name: "Lips",
        price: "6",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Waxing",
        name: "Eyebrows",
        price: "12",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
    {
        groupName: "Waxing",
        name: "Chin",
        price: "7",
        description: "",
        imgURL:
            "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
    },
];

export default Services;
