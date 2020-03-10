import React from "react";
import {
    Drawer,
    AppBar,
    Toolbar,
    Container,
    Typography,
    IconButton,
    Icon,
    DrawerProps,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.scss";
import clsx from "clsx";
import NavItem from "../../models/NavItem";
import history from "../../models/history";

const goToExternal = (link: string) => {
    history.push(link);
};

const NavDrawer: React.FunctionComponent<NavDrawerProps> = ({
    onMenuClick,
    items,
    className,
    classes,
    ...others
}) => {
    const location = useLocation();

    return (
        <Drawer
            anchor="top"
            className={clsx(className, styles.drawer)}
            classes={{
                paper: styles.paper,
                ...classes,
            }}
            {...others}
        >
            <AppBar
                color="default"
                position="static"
                elevation={0}
                className={styles.appBar}
            >
                <Toolbar className={styles.toolbar}>
                    <Container className={clsx(styles.navWrapper, "spacer")}>
                        <Typography color="primary" className={styles.title}>
                            Attractions Salon
                        </Typography>
                        <div className="spacer"></div>
                        <IconButton onClick={onMenuClick}>
                            <Icon>menu</Icon>
                        </IconButton>
                    </Container>
                </Toolbar>
            </AppBar>
            <List>
                {items.map(item => {
                    let matched =
                        location.pathname === "/" || item.path === "/"
                            ? item.path === location.pathname
                            : location.pathname.startsWith(item.path);

                    const inside = (
                        <Container>
                            <ListItemText primary={item.name} />
                        </Container>
                    );

                    if (item.external) {
                        return (
                            <ListItem
                                key={item.path}
                                button
                                onClick={() => goToExternal(item.path)}
                            >
                                {inside}
                            </ListItem>
                        );
                    } else {
                        return (
                            <ListItem
                                key={item.path}
                                button
                                component={Link}
                                to={item.path}
                                selected={matched}
                            >
                                {inside}
                            </ListItem>
                        );
                    }
                })}
            </List>
        </Drawer>
    );
};

export interface NavDrawerProps extends DrawerProps {
    onMenuClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    items: NavItem[];
}

export default NavDrawer;
