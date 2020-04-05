import React, { useState } from "react";
import "./Services.css";
import ServiceGrid from "./ServiceGrid";
import { getServices } from "../../actions/serviceActions";

const Services = () => {
    const [initialLoad, setInitialLoad] = useState(true);
    const [serviceInfo, setServiceInfo] = useState([]);
    return (
        <div className="empty">
            {/** inefficient, should get modified */}
            {doInitialLoad(initialLoad, setInitialLoad, setServiceInfo)}
            <ServiceGrid services={serviceInfo}></ServiceGrid>
        </div>
    );
};

const doInitialLoad = (initialLoad, setInitialLoad, setServiceInfo) => {
    if (initialLoad) {
        setInitialLoad(false);
        updateServices(setServiceInfo);
    }
};

const updateServices = setServiceInfo => {
    getServices()
        .then(value => setServiceInfo(value))
        .catch(() => setServiceInfo(servicesJSON));
};

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
