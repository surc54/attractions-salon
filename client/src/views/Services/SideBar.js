import React from "react";
import { Button } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './Services.css';

const SideBar = (props) => {
    return (
        <div className="SideBar">
            
            <div className="titleBox">
                <FormControlLabel
                    className="SideBarTitle"
                    value="???"
                    control={<Button className="checkBoxes" size="small">Clear</Button>}
                    label="Filter by:"
                    labelPlacement="start"
                />
            </div>

            <div className="itemBox">
                <FormControlLabel className="checkBoxName"
                    value="???"
                    control={<Checkbox color="secondary" className="checkBoxes"/>}
                    label="Hair Care"
                    labelPlacement="start"
                />
            </div>

            <div className="itemBox">
                <FormControlLabel className="checkBoxName"
                    value="???"
                    control={<Checkbox color="secondary" />}
                    label="Haircuts"
                    labelPlacement="start"
                />
            </div>

            <div className="itemBox">
                <FormControlLabel className="checkBoxName"
                    value="???"
                    control={<Checkbox color="secondary" />}
                    label="Nail care"
                    labelPlacement="start"
                />
            </div>

            <div className="itemBox">
                <FormControlLabel className="checkBoxName"
                    value="???"
                    control={<Checkbox color="secondary" />}
                    label="Hair Extensions"
                    labelPlacement="start"
                />
            </div>

            <div className="itemBox">
                <FormControlLabel className="checkBoxName"
                    value="???"
                    control={<Checkbox color="secondary" />}
                    label="Waxing"
                    labelPlacement="start"
                />
            </div>


        </div>
    );
}
export default SideBar;