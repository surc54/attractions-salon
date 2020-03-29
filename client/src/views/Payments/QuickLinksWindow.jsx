import React from "react";
import { makeStyles, Button, ButtonBase, Typography } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import "./Payments.css";

const QuickLinksWindow = props => {
    const preventDefault = event => event.preventDefault();
    return (
        <div className="quickLinksWindow">
            <h2>Quick Links</h2>
            <Typography>
                <Link href="#" onClick={preventDefault} component="button">
                    Cancel your appointment
                </Link>
                <br></br>
                <Link href="#" onClick={preventDefault} component="button">
                    How does scheduling work?
                </Link>
                <br></br>
                <Link href="#" onClick={preventDefault} component="button">
                    Where will my appointment take place?
                </Link>
                <br></br>
                <Link href="#" onClick={preventDefault} component="button">
                    Call Attractions Salon
                </Link>
            </Typography>
        </div>
    );
}

export default QuickLinksWindow;