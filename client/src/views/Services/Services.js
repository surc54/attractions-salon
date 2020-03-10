import React from "react";
import "./Services.css";
//import SpacingGrid from "./TestGrid";
import ServiceGrid from "./ServiceGrid";

const Services = props => {
    return (
        <div className="empty">
            <ServiceGrid>services={services}</ServiceGrid>

            {/*<SpacingGrid></SpacingGrid>*/}
        </div>
    );
};

const services = [
    {
        groupName: "Process Color",
        items: [
            {
                name: "Single Process Color",
                price: "55.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Single Process/Cut",
                price: "70.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Double Process Color",
                price: "85.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Double Process/Cut",
                price: "100.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
        ],
    },
    {
        groupName: "Highlights",
        items: [
            {
                name: "Full Highlights",
                price: "85.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Full Highlights/Cut",
                price: "100.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Partial Highlights",
                price: "65.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Partial Highlights/Cut",
                price: "80.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
        ],
    },
    {
        groupName: "Treatments",
        items: [
            {
                name: "Color Rinse (after relaxer)",
                price: "25.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Relaxer",
                price: "65.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Relaxer/cut",
                price: "75.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Partial Relaxer",
                price: "35.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Partial Relaxer/Cut",
                price: "50.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Texturizer",
                price: "65.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Texturizer/Cut",
                price: "75.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Keratin Treatment",
                price: "200.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Keratin Treatment/Cut",
                price: "215.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
        ],
    },
    {
        groupName: "Hair Cuts",
        items: [
            {
                name: "Haircuts",
                price: "30.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Haircut Blow-dry",
                price: "38.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Men's Cut",
                price: "18.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Kid's cut",
                subtitle: "10 and under",
                price: "15.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
        ],
    },
    {
        groupName: "Hair Care",
        items: [
            {
                name: "Shampoo",
                price: "20.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Shampoo blow-dry",
                price: "30.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Shampoo set",
                price: "30.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Spiral set",
                price: "50.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Natural blowouts",
                price: "75.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Natural blowouts/cut",
                price: "85.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Deep conditioners",
                price: "15.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Flat Irons",
                price: "15.00",
                subtitle:
                    "(Additional with any other hair service)(not sold alone)",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
        ],
    },
    {
        groupName: "Hair externsions",
        items: [
            {
                name: "Sew ins",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Ponytails",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Clip ins",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Locks ",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Crochet ",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Braids",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Sisterlock",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
        ],
    },
    {
        groupName: "Waxing",
        items: [
            {
                name: "Lips",
                price: "6.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Eyebrows",
                price: "12.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
            {
                name: "Chin",
                price: "7.00",
                description: "",
                img:
                    "https://images.pexels.com/photos/973403/pexels-photo-973403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            },
        ],
    },
];

export default Services;
