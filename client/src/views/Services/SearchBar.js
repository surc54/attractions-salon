import React from "react";
import "./Services.css";
import { Button, IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const SearchBar = props => {
    return (
        <div className="SearchBar">
            <TextField
                id="search"
                label="Search services here"
                variant="outlined"
                autoComplete="off"
                style={{ width: 412.69, marginLeft: 50 }}
                value={props.filterText}
                onChange={event => {
                    props.setFilterText(event.target.value);
                }}
            />
            <span className="spacer" />
            <div className="buttonHolder">
                <Button key={"Book an appointment"} color="primary" variant="outlined">
                    Book an appointment
                </Button>
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
