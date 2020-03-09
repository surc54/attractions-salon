import React from "react";
import './Services.css';

import SpacingGrid from "./TestGrid";
import ServiceGrid from "./ServiceGrid";

const Services = (props) => {
    return (
        <div className="empty">
            <ServiceGrid></ServiceGrid>
            <p>this is a test</p> 
            <SpacingGrid></SpacingGrid> 

        </div>
    );
}

export default Services;