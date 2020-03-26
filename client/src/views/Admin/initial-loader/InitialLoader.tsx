import {
    Button,
    Container,
    LinearProgress,
    Tooltip,
    Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useUserAuth } from "../../../hooks";
import styles from "./InitialLoader.module.scss";

const InitialLoader: React.FC<InitialLoaderProps> = ({
    status,
    className,
    error,
    onRetry,
    ...others
}) => {
    const userAuth = useUserAuth();

    if (!document.getElementById("admin-loader")) {
        const div = document.createElement("div");
        div.id = "admin-loader";
        document.querySelector("body")?.appendChild(div);
    }

    return ReactDOM.createPortal(
        <div className={clsx(styles.wrapper, className)} {...others}>
            <Container className={styles.container}>
                <CSSTransition
                    in={userAuth.loading}
                    timeout={300}
                    classNames={styles.header}
                    unmountOnExit
                >
                    <Container className={styles.header}>
                        <h1>Attractions Salon</h1>
                        <LinearProgress
                            variant="indeterminate"
                            className={styles.progressBar}
                        />
                        <Typography
                            align="center"
                            variant="button"
                            className={styles.statusText}
                        >
                            {status || <>&nbsp;</>}
                        </Typography>
                    </Container>
                </CSSTransition>
                <CSSTransition
                    in={!userAuth.loading && !!userAuth.error}
                    timeout={300}
                    classNames={styles.errorWrapper}
                    unmountOnExit
                >
                    <Container className={styles.errorWrapper}>
                        <Tooltip title="Go to the home page" enterDelay={300}>
                            <Button color="primary" component={Link} to="/">
                                <h1 className={styles.noGutter}>
                                    Attractions Salon
                                </h1>
                            </Button>
                        </Tooltip>
                        <Typography
                            variant="body1"
                            color="error"
                            className={styles.error}
                        >
                            {error}
                        </Typography>
                        {onRetry && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onRetry}
                            >
                                Try again
                            </Button>
                        )}
                    </Container>
                </CSSTransition>
            </Container>
        </div>,
        document.getElementById("admin-loader") as Element
    );
};

export interface InitialLoaderProps extends React.HTMLProps<HTMLDivElement> {
    status?: string;
    error?: string;
    onRetry?: () => void;
}

export default InitialLoader;
