import React from "react";
import "./Services.css";
import ServiceGrid from "./ServiceGrid";

import services from "../../../../server/models/services.model";

const Services = props => {
    return (
        <div className="empty">
            <ServiceGrid
                services={servicesFile}
                servicesFromDB={servicesFromDB}
            ></ServiceGrid>

            {/*<SpacingGrid></SpacingGrid>*/}
        </div>
    );
};

// const servicesFromDB = () => {
//     services
//         .find({})
//         .then(value => {
//             return value;
//         })
//         .catch(reason => throw reason;
//         );
// };

const servicesFile = [
    {
        groupName: "Process Color",
        items: [
            {
                name: "Single Process Color",
                price: "55",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Single Process/Cut",
                price: "70",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Double Process Color",
                price: "85",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Double Process/Cut",
                price: "100",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
        ],
    },
    {
        groupName: "Highlights",
        items: [
            {
                name: "Full Highlights",
                price: "85",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Full Highlights/Cut",
                price: "100",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Partial Highlights",
                price: "65",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Partial Highlights/Cut",
                price: "80",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
        ],
    },
    {
        groupName: "Treatments",
        items: [
            {
                name: "Color Rinse",
                price: "25",
                description: "",
                subtitle: "(after relaxer)",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Relaxer",
                price: "65",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Relaxer/cut",
                price: "75",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Partial Relaxer",
                price: "35",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Partial Relaxer/Cut",
                price: "50",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Texturizer",
                price: "65",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Texturizer/Cut",
                price: "75",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Keratin Treatment",
                price: "200",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Keratin Treatment/Cut",
                price: "215",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
        ],
    },
    {
        groupName: "Hair Cuts",
        items: [
            {
                name: "Haircuts",
                price: "30",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Haircut Blow-dry",
                price: "38",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Men's Cut",
                price: "18",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Kid's cut",
                subtitle: "10 and under",
                price: "15",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
        ],
    },
    {
        groupName: "Hair Care",
        items: [
            {
                name: "Shampoo",
                price: "20",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Shampoo blow-dry",
                price: "30",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Shampoo set",
                price: "30",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Spiral set",
                price: "50",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Natural blowouts",
                price: "75",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Natural blowouts/cut",
                price: "85",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Deep conditioners",
                price: "15",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Flat Irons",
                price: "15",
                subtitle:
                    "(Additional with any other hair service)(not sold alone)",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
        ],
    },
    {
        groupName: "Hair externsions",
        items: [
            {
                name: "Sew ins",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Ponytails",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Clip ins",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Locks ",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Crochet ",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Braids",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Sisterlock",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
        ],
    },
    {
        groupName: "Waxing",
        items: [
            {
                name: "Lips",
                price: "6",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Eyebrows",
                price: "12",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
            {
                name: "Chin",
                price: "7",
                description: "",
                imgURL:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg",
            },
        ],
    },
];

export default Services;
