import React from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import {
    Typography,
    Paper,
    TextField,
    Button,
    Icon,
    IconButton,
    useTheme,
    useMediaQuery,
    CircularProgress,
} from "@material-ui/core";
import styles from "./Login.module.scss";
import clsx from "clsx";
import { CSSTransition } from "react-transition-group";

const goBack = history => {
    if (history.length !== 0) {
        history.goBack();
    } else {
        history.push("/");
    }
};

const goHome = history => {
    history.push("/");
};

const AdminBase = () => {
    const history = useHistory();
    const location = useLocation();
    const [loading, setLoading] = React.useState(false);

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("xs"));

    React.useEffect(() => {
        history.replace(location.pathname, {
            navbarSettings: {
                disable: true,
            },
        });

        return () => {
            history.replace(history.location.pathname, {
                navbarSettings: {
                    disable: false,
                },
            });
        };
    }, []);

    return (
        <div
            className={clsx(styles.wrapper, {
                [styles.small]: isSmall,
            })}
        >
            <header>
                <IconButton
                    className={styles.backButton}
                    onClick={() => goBack(history)}
                >
                    <Icon>arrow_back</Icon>
                </IconButton>

                <Button
                    className={styles.titleButton}
                    color="primary"
                    onClick={() => goHome(history)}
                >
                    <Typography
                        className={styles.title}
                        color="primary"
                        variant="h1"
                    >
                        Attractions Salon
                    </Typography>
                </Button>
            </header>

            <Paper className={styles.paper} square={isSmall}>
                <Typography className={styles.subtitle} variant="h2">
                    Sign in to continue
                </Typography>
                <TextField
                    className={styles.input}
                    label="Username"
                    placeholder="member@example.com"
                    type="text"
                    variant="outlined"
                    fullWidth
                    required
                    autoComplete="off"
                />
                <TextField
                    className={styles.input}
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    autoComplete="off"
                />

                <div className={styles.actions}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        onClick={() => setLoading(!loading)}
                        className={styles.submitButton}
                    >
                        <span style={{ marginTop: 2 }}>Continue</span>
                        <span className="spacer"></span>
                        {loading ? (
                            <CircularProgress color="inherit" size={20} />
                        ) : (
                            <Icon>arrow_forward</Icon>
                        )}
                    </Button>
                </div>
            </Paper>

            <Warning icon style={{ maxWidth: 450, width: "100%" }}>
                You are entering a restricted area. Unauthorized access is
                prohibited
            </Warning>
        </div>
    );
};

const Warning = ({ children, icon, elevation, className, ...others }) => {
    return (
        <Paper
            elevation={elevation || 0}
            className={clsx(styles.warningWrapper, className)}
            {...others}
        >
            {icon && (
                <div className={styles.icon}>
                    <Icon>warning</Icon>
                </div>
            )}
            <div className={styles.content}>{children}</div>
        </Paper>
    );
};

export default props => {
    // const [start, setStart] = React.useState(false);

    // React.useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setStart(true);
    //     }, 200);

    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <CSSTransition
            appear
            in
            classNames={styles.wrapper}
            timeout={500}
            mountOnEnter
            unmountOnExit
        >
            <AdminBase {...props} />
        </CSSTransition>
    );
};
