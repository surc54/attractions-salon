import React from "react";
import './Services.css';

import SpacingGrid from "./TestGrid";

const styleTest = {
    backgroundColor:"pink",
    //backgroundColor:"FFC0CB",
}

const Services = (props) => {
    return (
        <div className="empty" style = {styleTest}>
            <header className="empty"> 


            {
            /* 
            <img src={logo} className="App-logo" alt="logo" /> 
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                </a> 
            */
            }
                
            </header> {/* fill this */}

            
            <SpacingGrid></SpacingGrid> 
            <p>this is a test</p>

        </div>
    );
}

export default Services;