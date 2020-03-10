import React from "react";
import "./Services.css";
//import SpacingGrid from "./TestGrid";
import ServiceGrid from "./ServiceGrid";

const Services = props => {
    return (
        <div className="empty">
            <ServiceGrid services={services}></ServiceGrid>

            {/*<SpacingGrid></SpacingGrid>*/}
        </div>
    );
};

const services = [
    {
        "groupName": "Process Color",
        "items": [
            {
                "name": "Single Process Color",
                "price": "55.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Single Process/Cut",
                "price": "70.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Double Process Color",
                "price": "85.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Double Process/Cut",
                "price": "100.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            }
        ]
    },
    {
        "groupName": "Highlights",
        "items": [
            {
                "name": "Full Highlights",
                "price": "85.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Full Highlights/Cut",
                "price": "100.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Partial Highlights",
                "price": "65.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Partial Highlights/Cut",
                "price": "80.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            }
        ]
    },
    {
        "groupName": "Treatments",
        "items": [
            {
                "name": "Color Rinse (after relaxer)",
                "price": "25.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Relaxer",
                "price": "65.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Relaxer/cut",
                "price": "75.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Partial Relaxer",
                "price": "35.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Partial Relaxer/Cut",
                "price": "50.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Texturizer",
                "price": "65.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Texturizer/Cut",
                "price": "75.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Keratin Treatment",
                "price": "200.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Keratin Treatment/Cut",
                "price": "215.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            }
        ]
    },
    {
        "groupName": "Hair Cuts",
        "items": [
            {
                "name": "Haircuts",
                "price": "30.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Haircut Blow-dry",
                "price": "38.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Men's Cut",
                "price": "18.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Kid's cut",
                "subtitle": "10 and under",
                "price": "15.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            }
        ]
    },
    {
        "groupName": "Hair Care",
        "items": [
            {
                "name": "Shampoo",
                "price": "20.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Shampoo blow-dry",
                "price": "30.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Shampoo set",
                "price": "30.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Spiral set",
                "price": "50.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Natural blowouts",
                "price": "75.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Natural blowouts/cut",
                "price": "85.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Deep conditioners",
                "price": "15.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Flat Irons",
                "price": "15.00",
                "subtitle": "(Additional with any other hair service)(not sold alone)",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            }
        ]
    },
    {
        "groupName": "Hair externsions",
        "items": [
            {
                "name": "Sew ins",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Ponytails",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Clip ins",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Locks ",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Crochet ",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Braids",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Sisterlock",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            }
        ]
    },
    {
        "groupName": "Waxing",
        "items": [
            {
                "name": "Lips",
                "price": "6.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Eyebrows",
                "price": "12.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            },
            {
                "name": "Chin",
                "price": "7.00",
                "description": "",
                "imgURL":"https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg"
            }
        ]
    }
];


export default Services;
