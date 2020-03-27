import {
    Button,
    CircularProgress,
    Icon,
    IconButton,
    LinearProgress,
    Link,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import querystring from "querystring";
import React from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useUserAuth } from "../../hooks";
import LayeredBackground from "./LayeredBackground";
import styles from "./Login.module.scss";
import LoginForm from "./LoginForm";
import LoginRedirect from "./LoginRedirect";
import SignUpForm from "./SignUpForm";
import { useSnackbar } from "notistack";
import { emsg } from "../../tools";
import Config from "../../models/Config";

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

const Login = ({ keepNavBar, modalMode, closeModal }) => {
    const history = useHistory();
    const location = useLocation();
    const userAuth = useUserAuth();
    const snack = useSnackbar();
    const [redirectCancelled, setRedirectCancelled] = React.useState(false);
    const [initialLoading, setInitialLoading] = React.useState(true);
    const [paperHeight, setPaperHeight] = React.useState(0);
    const [, forceRender] = React.useReducer(state => state + 1, 0);
    const [ofy, setOfy] = React.useState(true);
    const mainRef = React.createRef();

    const signUpMode = /login\/signup([?#].*|\/.*)?$/i.test(location.pathname);

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
    const query = querystring.parse(location.search.substr(1));

    React.useLayoutEffect(() => {
        const newHeight =
            mainRef.current.offsetHeight + 6 + (!modalMode ? 64 : 0);
        let timer;
        if (newHeight === paperHeight) {
            timer = setTimeout(() => {
                setOfy(false);
            }, 300);
            return () => {
                if (timer) clearTimeout(timer);
            };
        } else {
            // console.log(mainRef.current.offsetHeight);
            setOfy(true);
            setPaperHeight(newHeight);
            timer = setTimeout(() => {
                setOfy(false);
            }, 300);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
        // eslint-disable-next-line
    }, [mainRef, userAuth.loading, modalMode]);

    // INITIAL LOAD ANIMATION
    React.useEffect(() => {
        if (!initialLoading) return;

        if (!userAuth.loading) {
            setInitialLoading(false);
        }
        // eslint-disable-next-line
    }, [userAuth.loading]);

    const onFormSubmit = React.useCallback((email, password) => {
        if (userAuth.signedIn) {
            userAuth
                .logout()
                .then(res => {
                    console.log("Logged out!");
                })
                .catch(e => {
                    console.error(e);
                    snack.enqueueSnackbar("Error: " + emsg(e), {
                        variant: "error",
                        autoHideDuration: 5000,
                    });
                });
        } else {
            userAuth
                .login(email, password)
                .then(res => {
                    console.log("Logged in!");
                })
                .catch(e => {
                    console.error(e);
                    snack.enqueueSnackbar("Error: " + emsg(e), {
                        variant: "error",
                        autoHideDuration: 5000,
                    });
                });
        }
        // eslint-disable-next-line
    }, []);

    const onSignOut = () => {
        userAuth.logout();
        if (closeModal) closeModal();
    };

    React.useEffect(() => {
        if (keepNavBar || modalMode) return;
        history.replace(location.pathname + location.search + location.hash, {
            navbarSettings: {
                disable: true,
            },
        });

        return () => {
            history.replace(
                history.location.pathname +
                    history.location.search +
                    history.location.hash,
                {
                    navbarSettings: {
                        disable: false,
                    },
                }
            );
        };
        // eslint-disable-next-line
    }, []);

    return (
        <LayeredBackground>
            <div
                className={clsx(styles.wrapper, {
                    [styles.small]: isSmall,
                })}
            >
                <Paper
                    className={styles.paper}
                    style={{
                        height: isSmall ? "100%" : paperHeight,
                        overflowY: initialLoading || ofy ? "hidden" : "auto",
                    }}
                    square={isSmall}
                >
                    {/* {!!userAuth.loading && ( */}
                    <LinearProgress
                        className={styles.loadingProgress}
                        variant={
                            userAuth.loading ? "indeterminate" : "determinate"
                        }
                        value={0}
                    />
                    {/* )} */}
                    {!modalMode && (
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
                    )}
                    <main ref={mainRef}>
                        {initialLoading ? (
                            <CircularProgress />
                        ) : userAuth.signedIn ? (
                            <>
                                <div className={styles.signedInDetails}>
                                    {/* <Avatar className={styles.avatar}>
                                        {userAuth.user.fullName
                                            .split(" ")
                                            .map(x => x.substr(0, 1))
                                            .join("")}
                                    </Avatar> */}
                                    <div className={styles.details}>
                                        <Typography variant="button">
                                            Welcome,
                                        </Typography>
                                        <Typography
                                            noWrap
                                            className={styles.name}
                                        >
                                            {userAuth.user.name.first}
                                        </Typography>
                                    </div>
                                    <span className="spacer"></span>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={onSignOut}
                                        disabled={userAuth.loading}
                                    >
                                        Sign out
                                    </Button>
                                </div>

                                {!redirectCancelled &&
                                location.state &&
                                location.state.redirectAfterLogin &&
                                location.state.redirectAfterLogin.path ? (
                                    <LoginRedirect
                                        timeout={3}
                                        onCancel={() =>
                                            setRedirectCancelled(true)
                                        }
                                        goTo={
                                            location.state.redirectAfterLogin
                                                .path
                                        }
                                        displayName={
                                            location.state.redirectAfterLogin
                                                .displayName || undefined
                                        }
                                    />
                                ) : !redirectCancelled && query.next ? (
                                    <LoginRedirect
                                        timeout={3}
                                        onCancel={() =>
                                            setRedirectCancelled(true)
                                        }
                                        close={query.next === "close"}
                                        goTo={query.next}
                                    />
                                ) : (
                                    <div className={styles.signedInLinks}>
                                        <Link
                                            component={RouterLink}
                                            to="/profile"
                                            onClick={() => {
                                                if (closeModal) closeModal();
                                            }}
                                        >
                                            Go to your profile
                                        </Link>
                                        {Config.adminPage.rolesAllowed.includes(
                                            userAuth.user.role
                                        ) && (
                                            <Link
                                                component={RouterLink}
                                                to="/admin"
                                                onClick={() => {
                                                    if (closeModal)
                                                        closeModal();
                                                }}
                                            >
                                                Go to Admin Panel
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : signUpMode ? (
                            <>
                                <Typography
                                    className={styles.subtitle}
                                    variant="h2"
                                >
                                    Let's get set up!
                                </Typography>
                                <SignUpForm forceRender={forceRender} />
                                <div className={styles.textActions}>
                                    <Typography>
                                        Already have an account?{" "}
                                        <Link
                                            component={RouterLink}
                                            to="/login"
                                        >
                                            Sign in!
                                        </Link>
                                    </Typography>
                                </div>
                            </>
                        ) : (
                            <>
                                <Typography
                                    className={styles.subtitle}
                                    variant="h2"
                                >
                                    Sign in to continue
                                </Typography>

                                <LoginForm
                                    defaultEmail={
                                        location &&
                                        location.state &&
                                        location.state.email
                                    }
                                    forceRender={forceRender}
                                    onSubmit={onFormSubmit}
                                    loading={userAuth.loading}
                                />

                                <div className={styles.textActions}>
                                    {/* <Link
                                        component={RouterLink}
                                        to="/account/forgot"
                                    >
                                        Forgot your password?
                                    </Link>
                                    <br /> */}
                                    {/* <br /> */}
                                    <Typography>
                                        Don't have an account?{" "}
                                        <Link
                                            component={RouterLink}
                                            to="/login/signup"
                                        >
                                            Create one!
                                        </Link>
                                    </Typography>
                                </div>
                            </>
                        )}
                    </main>
                </Paper>
            </div>
        </LayeredBackground>
    );
};

// const Warning = ({ children, icon, elevation, className, ...others }) => {
//     return (
//         <Paper
//             elevation={elevation || 0}
//             className={clsx(styles.warningWrapper, className)}
//             {...others}
//         >
//             {icon && (
//                 <div className={styles.icon}>
//                     <Icon>warning</Icon>
//                 </div>
//             )}
//             <div className={styles.content}>{children}</div>
//         </Paper>
//     );
// };

export default props => {
    // const [start, setStart] = React.useState(false);

    // React.useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setStart(true);
    //     }, 200);

    //     return () => clearTimeout(timer);
    // }, []);
    if (props.modalMode) {
        return <Login {...props} />;
    }

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
