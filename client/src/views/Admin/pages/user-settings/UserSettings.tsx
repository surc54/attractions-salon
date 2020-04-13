import {
    Chip,
    Icon,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@material-ui/core";
import React from "react";
import { useAdminUserSettings, useUserAuth } from "../../../../hooks";
import Toolbar from "./Toolbar";
import styles from "./UserSettings.module.scss";
import UserModal from "./UserModal";
import User from "../../../../models/User";

const ITEMS_PER_PAGE = 10;

const UserSettings: React.FC = () => {
    const [page, setPage] = React.useState<number>(0);
    const userSettings = useAdminUserSettings();
    const userAuth = useUserAuth();
    const [selectedUser, setSelectedUser] = React.useState<string | null>(null);

    const refresh = () => {
        userSettings.resetQuery().then(() => {
            if (page === 0) {
                userSettings.getUserList(userSettings.query, page);
            } else setPage(0);
        });
    };

    React.useEffect(() => {
        userSettings.getUserList();
    }, []);

    React.useEffect(() => {
        // Reset the page to 0 when the query changes!
        setPage(0);
    }, [userSettings.query]);

    React.useEffect(() => {
        if (userSettings.loading) return;

        if (!userSettings.loadedPages.includes(page)) {
            userSettings.getUserList(userSettings.query, page);
        }
    }, [page]);

    const currentPage = userSettings.users.slice(
        page * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE + 10
    );

    return (
        <div className={styles.wrapper}>
            <header className="__admin_header">
                {/* Special class __admin_header to get consistent styles */}
                {/* Imports not required for this. */}
                <h1>User Accounts</h1>
                <IconButton>
                    <Icon>help</Icon>
                </IconButton>
            </header>

            <Toolbar
                onClearFilter={() => {
                    userSettings.resetQuery({ search: "" }).then(() => {
                        if (page === 0) {
                            userSettings.getUserList({}, page);
                        } else setPage(0);
                    });
                }}
                onRefresh={refresh}
            />

            <TableContainer component={Paper} elevation={0}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell align="right">Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentPage.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    {userSettings.loading
                                        ? "Loading. Please wait..."
                                        : "Nothing's here"}
                                </TableCell>
                            </TableRow>
                        )}
                        {currentPage.map((row) => (
                            <TableRow
                                key={row.id}
                                hover
                                onClick={() => setSelectedUser(row.id)}
                            >
                                <TableCell component="th" scope="row">
                                    {row.fullName}
                                    {row.id === userAuth.user?.id ? (
                                        <>
                                            {" "}
                                            <Chip
                                                label="you"
                                                size="small"
                                                color="primary"
                                            />
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone ?? "N/A"}</TableCell>
                                <TableCell align="right">
                                    <Chip
                                        label={row.role}
                                        size="small"
                                        color={
                                            row.role === "Guest"
                                                ? undefined
                                                : "primary"
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={userSettings.count}
                    rowsPerPage={ITEMS_PER_PAGE}
                    rowsPerPageOptions={[ITEMS_PER_PAGE]}
                    page={page}
                    onChangePage={(e, i) => {
                        if (!userSettings.loading) {
                            setPage(i);
                        }
                    }}
                />
            </TableContainer>
            <UserModal
                open={Boolean(selectedUser)}
                user={
                    userSettings.users.find(
                        (x) => x.id === selectedUser
                    ) as User
                }
                onClose={() => setSelectedUser(null)}
            />
        </div>
    );
};

export default UserSettings;
