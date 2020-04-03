import React from "react";
import styles from "./UserSettings.module.scss";
import { IconButton, Icon } from "@material-ui/core";

const UserSettings: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <header className="__admin_header">
                {/* Special class __admin_header to get consistent styles */}
                {/* Imports not required for this. */}
                <h1>User Settings</h1>
                <IconButton>
                    <Icon>help</Icon>
                </IconButton>
            </header>

            <pre>Content not available</pre>
        </div>
    );
};

export default UserSettings;
