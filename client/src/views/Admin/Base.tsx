import React from "react";
import { useHistory, Router, Switch, Route } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import styles from "./Base.module.scss";
import { useUserAuth } from "../../hooks";
import { disableNavbarForPage } from "../../tools";
import InitialLoader from "./initial-loader/InitialLoader";
import { CSSTransition } from "react-transition-group";
import Config from "../../models/Config";
import { useSnackbar } from "notistack";
import NotFound from "../404/NotFound";
import UserSettings from "./pages/user-settings/UserSettings";
import ServiceSettings from "./pages/ServiceSettings";
import TestimonialsSettings from "./pages/TestimonialsSettings";

/**
 * Purpose:
 *  - make sure user is logged in
 *  - make sure user is admin
 */

const AdminBase: React.FC<AdminBaseProps> = () => {
    const history = useHistory();
    const snack = useSnackbar();
    const userAuth = useUserAuth();

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
                in={!unverified}
                classNames={styles.sidebar}
                unmountOnExit
                mountOnEnter
                appear
                timeout={300}
            >
                <AdminSidebar className={styles.sidebar} />
            </CSSTransition>
            <CSSTransition
                in={!unverified}
                classNames={styles.content}
                unmountOnExit
                mountOnEnter
                appear
                timeout={300}
            >
                <main className={styles.content}>
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
                            <Route component={NotFound} />
                        </Switch>
                    </Router>
                </main>
            </CSSTransition>
        </div>
    );
};

export interface AdminBaseProps {}

export default AdminBase;
