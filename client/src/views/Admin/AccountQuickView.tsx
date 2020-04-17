import {
    Avatar,
    Button,
    ThemeProvider,
    CircularProgress,
    createMuiTheme,
    Icon,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    ThemeProvider,
    Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import InfoDialog from "../../components/GenericDialogs/InfoDialog";
import { useUserAuth } from "../../hooks";
import Config from "../../models/Config";
import { getUserInitials } from "../../models/User";
import { emsg } from "../../tools";
import styles from "./AccountQuickView.module.scss";

const AccountQuickView: React.FC<AccountQuickViewProps> = ({
    onLogout,
    extraMenuOptions,
}) => {
    const userAuth = useUserAuth();
    const [moreMenuAnchor, setMoreMenuAnchor] = React.useState<any | null>(
        null
    );
    const [errDialog, setErrDialog] = React.useState<{
        open: boolean;
        message: string;
    }>({ open: false, message: "" });

    const openErrDialog = (message: string) => {
        setErrDialog({
            open: true,
            message,
        });
    };

    const closeErrDialog = () => {
        setErrDialog({ ...errDialog, open: false });
    };

    return (
        <>
            <ThemeProvider
                theme={createMuiTheme({
                    ...Config.theme,
                    palette: {
                        ...Config.theme.palette,
                        type: "dark",
                    },
                })}
            >
                <Paper className={styles.wrapper} elevation={0}>
                    {userAuth.loading ? (
                        <>
                            <Avatar className={styles.avatar}>
                                <CircularProgress size={28} />
                            </Avatar>
                            <div className={styles.details}>
                                <Typography variant="button">
                                    Loading user data
                                </Typography>
                            </div>
                        </>
                    ) : userAuth.error ? (
                        <>
                            <Avatar className={styles.avatar}>
                                <Icon>error</Icon>
                            </Avatar>
                            <div className={styles.details}>
                                <Typography variant="button">Error</Typography>
                            </div>
                            <span className="spacer"></span>
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    openErrDialog(
                                        emsg(userAuth.error) || "No error"
                                    )
                                }
                            >
                                Learn More
                            </Button>
                        </>
                    ) : userAuth.signedIn ? (
                        <>
                            <Avatar className={styles.avatar}>
                                {getUserInitials(userAuth.user)}
                            </Avatar>
                            <div className={styles.details}>
                                <Typography className={styles.name}>
                                    {userAuth.user?.fullName}
                                </Typography>
                                <Typography
                                    className={styles.title}
                                    variant="button"
                                >
                                    {userAuth.user?.role}
                                </Typography>
                            </div>
                            <span className="spacer"></span>
                            <IconButton
                                className={styles.button}
                                size="small"
                                onClick={(e) =>
                                    setMoreMenuAnchor(e.currentTarget)
                                }
                            >
                                <Icon>more_vert</Icon>
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Avatar className={styles.avatar}>
                                {getUserInitials(userAuth.user)}
                            </Avatar>
                            <div className={styles.details}>
                                <Typography
                                    className={styles.title}
                                    variant="button"
                                >
                                    Not signed in
                                </Typography>
                            </div>
                            <span className="spacer"></span>
                            <Button
                                variant="outlined"
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>
                        </>
                    )}
                </Paper>
            </ThemeProvider>
            <InfoDialog
                open={errDialog.open}
                title="Could not get user"
                onClose={closeErrDialog}
            >
                {errDialog.message}
            </InfoDialog>
            <Menu
                open={!!moreMenuAnchor}
                anchorEl={moreMenuAnchor}
                onClose={() => setMoreMenuAnchor(null)}
            >
                {extraMenuOptions}
                <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export interface AccountQuickViewProps {
    extraMenuOptions?: Element[];
    onLogout: () => void;
}

export default AccountQuickView;
