import {
    AppBar,
    Avatar,
    CircularProgress,
    Container,
    Drawer,
    DrawerProps,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserAuth } from "../../hooks";
import history from "../../models/history";
import NavItem from "../../models/NavItem";
import User from "../../models/User";
import styles from "./NavBar.module.scss";

const getUserInitials = (user?: User | null) => {
    let initials = (user?.fullName || "?")
        .split(" ")
        .map(x => x.substr(0, 1))
        .join("")
        .trim()
        .substr(0, 2);
    return initials;
};

const goToExternal = (link: string, closeNavbar?: Function) => {
    history.push(link);
    closeNavbar?.();
};

const NavDrawer: React.FunctionComponent<NavDrawerProps> = ({
    onMenuClick,
    items,
    className,
    classes,
    goToLogin,
    ...others
}) => {
    const location = useLocation();
    const userAuth = useUserAuth();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only("xs"));

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
                            <ListItemText
                                primary={item.name}
                                secondary={item.desc}
                            />
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
                                onClick={() => onMenuClick()}
                            >
                                {inside}
                            </ListItem>
                        );
                    }
                })}
                {!userAuth.loading &&
                    (userAuth.signedIn ? (
                        <ListItem
                            button
                            onClick={() => onMenuClick?.()}
                            style={{
                                paddingLeft: isXs ? 32 : 40,
                                paddingRight: isXs ? 32 : 40,
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    {getUserInitials(userAuth.user)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={userAuth?.user?.fullName}
                                secondary={"view profile, sign out, etc."}
                            />
                        </ListItem>
                    ) : (
                        <ListItem
                            button
                            onClick={() => {
                                onMenuClick?.();
                                goToLogin?.();
                            }}
                        >
                            <Container>
                                <ListItemText
                                    primary="Login"
                                    secondary="see your profile, past appointments, etc."
                                />
                            </Container>
                        </ListItem>
                    ))}
            </List>
            {userAuth.loading ? <CircularProgress size={24} /> : null}
        </Drawer>
    );
};

export interface NavDrawerProps extends DrawerProps {
    onMenuClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    goToLogin?: () => void;
    items: NavItem[];
}

export default NavDrawer;
