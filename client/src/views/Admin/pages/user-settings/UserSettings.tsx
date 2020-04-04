import React from "react";
import {
    IconButton,
    Icon,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from "@material-ui/core";
import styles from "./UserSettings.module.scss";
import { useAdminUserSettings } from "../../../../hooks";

const UserSettings: React.FC = () => {
    const adminUserSettings = useAdminUserSettings();

    React.useEffect(() => {
        adminUserSettings.getUserList();
    }, []);

    console.log(adminUserSettings);

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

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {adminUserSettings.users.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.fullName}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserSettings;
