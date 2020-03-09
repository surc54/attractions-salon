import React from "react";
import "./Services.css";
import { Button, IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const SearchBar = props => {
    return (
        <div className="SearchBar">
            <span className="spacer" />
            <div className="buttonHolder">
                
            </div>
            <div className="buttonHolder">
                {/* IconButton */}
                <IconButton key={"Cart"} color="primary"> {/* incomplete */}
                    Cart
                </IconButton>
            </div>
        </div>
    );
};
export default SearchBar;
