import {
    AppBar,
    Icon,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import React from "react";
import { Route, Router, Switch, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useUserAuth } from "../../hooks";
import Config from "../../models/Config";
import { disableNavbarForPage } from "../../tools";
import NotFound from "../404/NotFound";
import styles from "./Base.module.scss";
import InitialLoader from "./initial-loader/InitialLoader";
import ServiceSettings from "./pages/ServiceSettings";
import TestimonialsSettings from "./pages/TestimonialsSettings";
import UserSettings from "./pages/user-settings/UserSettings";
import AdminSidebar from "./Sidebar";

/**
 * Purpose:
 *  - make sure user is logged in
 *  - make sure user is admin
 */

const AdminBase: React.FC<AdminBaseProps> = () => {
    const history = useHistory();
    const snack = useSnackbar();
    const userAuth = useUserAuth();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const [overlayOpen, setOverlayOpen] = React.useState<boolean>(false);

    React.useEffect(disableNavbarForPage(history), []);

    const unverified = userAuth.loading || !!userAuth.error;

    React.useEffect(() => {
        if (
            !userAuth.loading &&
            !userAuth.error &&
            (!userAuth.signedIn ||
                !userAuth.user ||
                !Config.adminPage.rolesAllowed.includes(userAuth.user.role))
        ) {
            snack.enqueueSnackbar("You don't have permission for this page.", {
                variant: "error",
                autoHideDuration: 6000,
            });
            history.push("/");
        }
        // eslint-disable-next-line
    }, [userAuth]);

    return (
        <div className={styles.wrapper}>
            <CSSTransition
                in={unverified}
                classNames={styles.initialLoader}
                unmountOnExit
                mountOnEnter
                timeout={300}
            >
                <InitialLoader
                    status={
                        userAuth.loading
                            ? "Verifying user identity..."
                            : undefined
                    }
                    error={userAuth.error || undefined}
                    onRetry={userAuth.updateInfo}
                />
            </CSSTransition>
            <CSSTransition
                in={!unverified && isSmall}
                classNames={styles.sidebar}
                unmountOnExit
                mountOnEnter
                appear
                timeout={300}
            >
                <AppBar className={styles.appBar} elevation={0}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            onClick={() => setOverlayOpen(true)}
                        >
                            <Icon>menu</Icon>
                        </IconButton>
                        <Typography variant="h6">Admin Panel</Typography>
                    </Toolbar>
                </AppBar>
            </CSSTransition>
            <CSSTransition
                in={!unverified}
                classNames={styles.sidebar}
                unmountOnExit
                mountOnEnter
                appear
                timeout={300}
            >
                <AdminSidebar
                    overlayMode={isSmall}
                    overlayOpen={overlayOpen}
                    setOverlayOpen={setOverlayOpen}
                    className={styles.sidebar}
                />
            </CSSTransition>
            <CSSTransition
                in={!unverified}
                classNames={styles.content}
                unmountOnExit
                mountOnEnter
                appear
                timeout={300}
            >
                <main
                    className={clsx(styles.content, {
                        [styles.small]: isSmall,
                    })}
                >
                    <Router history={history}>
                        <Switch>
                            <Route
                                path="/admin/page/services"
                                component={ServiceSettings}
                            />
                            <Route
                                path="/admin/page/testimonials"
                                component={TestimonialsSettings}
                            />
                            <Route
                                path="/admin/misc/users"
                                component={UserSettings}
                            />
                            <Route render={() => <NotFound equalSplit />} />
                        </Switch>
                    </Router>
                </main>
            </CSSTransition>
        </div>
    );
};

export interface AdminBaseProps {}

export default AdminBase;
