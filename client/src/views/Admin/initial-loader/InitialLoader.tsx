import React from "react";
import styles from "./InitialLoader.module.scss";
import {
    LinearProgress,
    Container,
    Typography,
    Button,
    Icon,
} from "@material-ui/core";
import { useUserAuth } from "../../../hooks";
import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import AdminBase from "../Base";

const ROLES_ALLOWED = ["Admin", "Owner"];

const InitialLoader: React.FC = () => {
    const userAuth = useUserAuth();
    const snack = useSnackbar();
    const history = useHistory();

    React.useEffect(() => {
        if (!userAuth.loading) {
            const { user, signedIn, error } = userAuth;
            if (
                !error &&
                (!signedIn ||
                    !user ||
                    !ROLES_ALLOWED.includes("Admin" || user.role))
            ) {
                snack.enqueueSnackbar("You're not allowed here.", {
                    variant: "error",
                });
                history.push("/");
            }
        }
    }, [userAuth]);

    const tryAgain = () => userAuth.updateInfo();
    console.log("f");

    return (
        <>
            <CSSTransition
                in={userAuth.loading || !!userAuth.error}
                timeout={300}
                classNames={styles.wrapper}
                unmountOnExit
            >
                <div className={styles.wrapper}>
                    <Container className={styles.container}>
                        <CSSTransition
                            in={userAuth.loading}
                            timeout={300}
                            classNames={styles.header}
                            unmountOnExit
                        >
                            <div className={styles.header}>
                                <h1>Attractions Salon</h1>
                                <LinearProgress
                                    variant="indeterminate"
                                    className={styles.progressBar}
                                />
                            </div>
                        </CSSTransition>
                        <CSSTransition
                            in={!userAuth.loading && !!userAuth.error}
                            timeout={300}
                            classNames={styles.errorWrapper}
                            unmountOnExit
                        >
                            <div className={styles.errorWrapper}>
                                <Typography
                                    variant="body1"
                                    color="error"
                                    className={styles.error}
                                >
                                    {userAuth.error || "Unknown Error"}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={tryAgain}
                                >
                                    Try again
                                </Button>
                            </div>
                        </CSSTransition>
                    </Container>
                </div>
            </CSSTransition>
            {!userAuth.loading &&
                !userAuth.error &&
                userAuth.signedIn &&
                ROLES_ALLOWED.includes(
                    "Admin" || userAuth.user?.role || ""
                ) && <AdminBase />}
        </>
    );
};

export default InitialLoader;
