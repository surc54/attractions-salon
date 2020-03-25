import React from "react";
import {
    Paper,
    Typography,
    Avatar,
    Icon,
    IconButton,
    CircularProgress,
    Button,
    useTheme,
    ThemeProvider,
    createMuiTheme,
} from "@material-ui/core";
import { useUserAuth } from "../../hooks";
import styles from "./AccountQuickView.module.scss";
import Config from "../../models/Config";
import InfoDialog from "../../components/GenericDialogs/InfoDialog";
import { emsg } from "../../tools";
import { Redirect, useHistory, Link } from "react-router-dom";
import { getUserInitials } from "../../models/User";
import { useSnackbar } from "notistack";

const ROLES_ALLOWED = ["Admin", "Owner"];

const AccountQuickView: React.FC<AccountQuickViewProps> = () => {
    const userAuth = useUserAuth();
    const snack = useSnackbar();
    const history = useHistory();
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

    // React.useEffect(() => {
    //     if (
    //         !userAuth.loading &&
    //         (!userAuth.signedIn ||
    //             !userAuth.user ||
    //             !ROLES_ALLOWED.includes(userAuth.user.role))
    //     ) {
    //         snack.enqueueSnackbar("You're not allowed here.", {
    //             variant: "error",
    //         });
    //         history.push("/");
    //     }
    // }, [userAuth]);

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
                            <IconButton className={styles.button} size="small">
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
        </>
    );
};

export interface AccountQuickViewProps {}

export default AccountQuickView;
