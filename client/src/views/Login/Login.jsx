import {
    Button,
    CircularProgress,
    Icon,
    IconButton,
    LinearProgress,
    Link,
    Paper,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import LayeredBackground from "./LayeredBackground";
import styles from "./Login.module.scss";

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

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const [loading, setLoading] = React.useState(false);

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("xs"));

    const onFormSubmit = e => {
        e.preventDefault();
        setLoading(true);
        console.log("sign in form submit");
    };

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
        <LayeredBackground>
            <div
                className={clsx(styles.wrapper, {
                    [styles.small]: isSmall,
                })}
            >
                <Paper className={styles.paper} square={isSmall}>
                    {loading && (
                        <LinearProgress
                            className={styles.loadingProgress}
                            variant="indeterminate"
                        />
                    )}
                    <header>
                        <div className={styles.backButtonWrapper}>
                            <IconButton
                                className={styles.backButton}
                                onClick={() => goBack(history)}
                            >
                                <Icon>arrow_back</Icon>
                            </IconButton>
                        </div>

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
                    <main>
                        <Typography className={styles.subtitle} variant="h2">
                            Sign in to continue
                        </Typography>
                        <form
                            action="/api/login"
                            method="POST"
                            onSubmit={onFormSubmit}
                        >
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
                                placeholder="••••••••••••"
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
                                    type="submit"
                                    onClick={onFormSubmit}
                                    className={styles.submitButton}
                                >
                                    <span style={{ marginTop: 2 }}>
                                        Sign in
                                    </span>
                                    <span className="spacer"></span>
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : (
                                        <Icon>arrow_forward</Icon>
                                    )}
                                </Button>
                            </div>
                        </form>

                        <div className={styles.textActions}>
                            <Link component={RouterLink} to="/account/forgot">
                                Forgot your password?
                            </Link>
                            <br />
                            <Typography>
                                Don't have an account?{" "}
                                <Link
                                    component={RouterLink}
                                    to="/account/signup"
                                >
                                    Create one!
                                </Link>
                            </Typography>
                        </div>
                    </main>
                </Paper>
            </div>
        </LayeredBackground>
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
            <Login {...props} />
        </CSSTransition>
    );
};
