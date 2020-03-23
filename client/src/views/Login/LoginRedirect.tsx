import React from "react";
import { CircularProgress, Typography, Button } from "@material-ui/core";
import styles from "./LoginRedirect.module.scss";
import history from "../../models/history";

const go = (path: string = "/", state?: any) => {
    history.push(path, state);
};

const LoginRedirect: React.FC<LoginRedirectProps> = ({
    timeout = 5,
    goTo,
    goToState,
    displayName,
    close,
    onCancel,
}) => {
    const [progress, setProgress] = React.useState(0);
    const [cancel, setCancel] = React.useState(false);

    React.useEffect(() => {
        if (cancel) {
            onCancel?.();
            return;
        }
        if (progress >= 100) {
            if (close) {
                window?.opener?.onLoginComplete?.();
                go("/");
            } else {
                go(goTo, goToState);
            }
        }

        const slice = 100 / timeout;

        const timer = setTimeout(() => {
            const newVal = Math.ceil(progress + slice);

            if (newVal >= 100) {
                setProgress(100);
                clearInterval(timer);
            } else setProgress(newVal);
        }, 1000);

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [progress, cancel]);

    return (
        <div className={styles.wrapper}>
            <CircularProgress value={progress} variant="static" />
            <Typography className={styles.text} variant="button" noWrap>
                {displayName
                    ? "Heading to " + displayName + "..."
                    : "Heading back..."}
            </Typography>
            <span className="spacer"></span>
            <Button variant="outlined" onClick={() => setCancel(true)}>
                Cancel
            </Button>
        </div>
    );
};

export interface LoginRedirectProps {
    timeout?: number;
    goTo?: string;
    displayName?: string;
    goToState?: any;
    close?: boolean;
    onCancel?: () => void;
}

export default LoginRedirect;
