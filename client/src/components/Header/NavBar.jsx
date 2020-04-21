import {
    AppBar,
    Avatar,
    Button,
    CircularProgress,
    Container,
    Hidden,
    Icon,
    IconButton,
    makeStyles,
    Toolbar,
    Typography,
    useScrollTrigger,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { getUserInitials } from "../../models/User";
import { Link, useHistory, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useUserAuth } from "../../hooks";
import AccountMenu from "./AccountMenu";
import styles from "./NavBar.module.scss";
import NavDrawer from "./NavDrawer";

const navItems = [
    {
        name: "Home",
        desc: "about us, visit us, etc.",
        path: "/",
        external: false,
    },
    {
        name: "Services",
        desc: "view all offered services",
        path: "/services",
        external: false,
    },
    //{
    //    name: "Book Now",
    //    desc: "request an appointment for the salon",
    //    path: "/book",
    //    external: false,
    //},
    {
        name: "Payments",
        desc: "pay your booking in advance",
        path: "/payments",
        external: false,
    },
    {
        name: "Testimonials",
        desc: "see what people have to say about us",
        path: "/testimonials",
        external: false,
    },
];

const useStyles = makeStyles(theme => ({
    activeNavButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
            borderColor: theme.palette.primary.light,
        },
    },
}));

const NavBar = () => {
    const [mobileDrawer, setMobileDrawer] = React.useState(false);
    const [navbarSettings, setNavBarSettings] = React.useState({
        disable: false,
        style: "default",
        transparent: false,
    });
    const [accountMenuAnchor, setAmAnchor] = React.useState(null);
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const closeMobileDrawer = () => setMobileDrawer(false);
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const userAuth = useUserAuth();

    window.__debug_nav = (
        disable = false,
        style = "default",
        transparent = false
    ) => setNavBarSettings({ disable, style, transparent });

    const goToLogin = () => {
        history.push(
            "/login?next=" + location.pathname + location.search + location.hash
        );
        // u will lose state here!
    };

    React.useEffect(
        () => () => {
            setAmAnchor(null);
        },
        [isSmall]
    );

    React.useEffect(() => {
        if (location.state && location.state.navbarSettings) {
            setNavBarSettings(location.state.navbarSettings);
        }
    }, [location]);

    const isScrolled =
        useScrollTrigger({
            disableHysteresis: true,
            threshold: 0,
        }) && navbarSettings.disableNav === false;

    return (
        <CSSTransition
            in={!navbarSettings.disable}
            classNames={styles.appBar}
            timeout={300}
            unmountOnExit
        >
            <AppBar
                color="default"
                position="fixed"
                elevation={!isScrolled ? 0 : 4}
                className={clsx(styles.appBar, {
                    [styles.transparent]: navbarSettings.transparent,
                    [styles.light]: navbarSettings.style === "light",
                    [styles.dark]: navbarSettings.style === "dark",
                })}
            >
                <Toolbar className={styles.toolbar}>
                    <Container className={styles.navWrapper}>
                        <Typography color="primary" className={styles.title}>
                            Attractions Salon
                        </Typography>
                        <span className="spacer"></span>
                        <Hidden smDown>
                            {navItems.map(item => {
                                let matched =
                                    location.pathname === "/" ||
                                    item.path === "/"
                                        ? item.path === location.pathname
                                        : location.pathname.startsWith(
                                              item.path
                                          );

                                return (
                                    <Button
                                        key={item.path}
                                        className={clsx(styles.navButton, {
                                            [classes.activeNavButton]: matched,
                                            [styles.active]: matched,
                                        })}
                                        href={
                                            item.external
                                                ? item.path
                                                : undefined
                                        }
                                        component={
                                            !item.external ? Link : undefined
                                        }
                                        to={
                                            !item.external
                                                ? item.path
                                                : undefined
                                        }
                                        variant="outlined"
                                        color={matched ? "primary" : "default"}
                                    >
                                        {item.name}
                                    </Button>
                                );
                            })}
                            {userAuth.loading ? (
                                <IconButton size="small">
                                    <CircularProgress size={24} />
                                </IconButton>
                            ) : userAuth.signedIn ? (
                                <>
                                    <IconButton
                                        size="small"
                                        onClick={e =>
                                            setAmAnchor(e.currentTarget)
                                        }
                                    >
                                        <Avatar>
                                            {getUserInitials(userAuth.user)}
                                        </Avatar>
                                    </IconButton>
                                    <AccountMenu
                                        anchorEl={accountMenuAnchor}
                                        // anchorOrigin={{
                                        // horizontal: "right",
                                        // }}
                                        transformOrigin={{
                                            horizontal: "right",
                                            vertical: "bottom",
                                        }}
                                        onClose={() => setAmAnchor(null)}
                                    />
                                </>
                            ) : (
                                (() => {
                                    const matched =
                                        location.pathname === "/"
                                            ? "/login" === location.pathname
                                            : location.pathname.startsWith(
                                                  "/login"
                                              );

                                    return (
                                        <Button
                                            className={clsx(styles.navButton, {
                                                [classes.activeNavButton]: matched,
                                                [styles.active]: matched,
                                            })}
                                            onClick={goToLogin}
                                            variant="outlined"
                                            color={
                                                matched ? "primary" : "default"
                                            }
                                        >
                                            Login
                                        </Button>
                                    );
                                })()
                            )}
                        </Hidden>
                        <Hidden mdUp>
                            <IconButton onClick={() => setMobileDrawer(true)}>
                                <Icon>menu</Icon>
                            </IconButton>
                            <NavDrawer
                                open={mobileDrawer}
                                onBackdropClick={closeMobileDrawer}
                                onMenuClick={closeMobileDrawer}
                                items={navItems}
                                goToLogin={goToLogin}
                            />
                        </Hidden>
                    </Container>
                </Toolbar>
            </AppBar>
        </CSSTransition>
    );
};

export default NavBar;
