import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
    Button,
    Container,
    AppBar,
    Typography,
    Toolbar,
    makeStyles,
    useScrollTrigger,
} from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";
import styles from "./NavBar.module.scss";

const navItems = [
    {
        name: "Home",
        path: "/",
        external: false,
    },
    {
        name: "Services",
        path: "/services",
        external: false,
    },
    {
        name: "Book Now",
        path: "/book",
        external: false,
    },
    {
        name: "Payments",
        path: "/payments",
        external: false,
    },
    {
        name: "Testimonials",
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
    const f = useLocation();

    const classes = useStyles();
    const loc = useLocation();
    const isScrolled =
        useScrollTrigger({
            disableHysteresis: true,
            threshold: 0,
        }) &&
        (!f.state || f.state.disableNav === false);

    return (
        <CSSTransition
            in={!f.state || f.state.disableNav === false}
            classNames={styles.appBar}
            timeout={300}
            unmountOnExit
        >
            <AppBar
                color="default"
                position="fixed"
                elevation={!isScrolled ? 0 : 4}
                className={styles.appBar}
            >
                <Toolbar className={styles.toolbar}>
                    <Container className={styles.navWrapper}>
                        <Typography color="primary" className={styles.title}>
                            Attractions Salon
                        </Typography>
                        <span className="spacer"></span>
                        {navItems.map(item => {
                            let matched =
                                loc.pathname === "/" || item.path === "/"
                                    ? item.path === loc.pathname
                                    : loc.pathname.startsWith(item.path);

                            return (
                                <Button
                                    key={item.path}
                                    className={clsx(styles.navButton, {
                                        [classes.activeNavButton]: matched,
                                    })}
                                    href={item.external ? item.path : undefined}
                                    component={
                                        !item.external ? Link : undefined
                                    }
                                    to={!item.external ? item.path : undefined}
                                    variant="outlined"
                                    color={matched ? "primary" : "default"}
                                >
                                    {item.name}
                                </Button>
                            );
                        })}
                    </Container>
                </Toolbar>
            </AppBar>
        </CSSTransition>
    );
};

export default NavBar;
