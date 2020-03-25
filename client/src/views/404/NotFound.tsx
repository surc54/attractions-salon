import {
    Button,
    Container,
    Grid,
    Icon,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import pic from "../../assets/undraw_lost_bqr2.svg";
import history from "../../models/history";
import styles from "./NotFound.module.scss";

const goBack = () => {
    history.goBack();
};

const goHome = () => {
    history.push("/");
};

const goToContactUs = () => {
    history.push("/contact");
};

const NotFound: React.FC<NotFoundProps> = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div
            className={clsx(styles.wrapper, {
                [styles.small]: isSmall,
            })}
        >
            <Container className={styles.container}>
                <Grid
                    container
                    spacing={!isSmall ? 5 : undefined}
                    justify="center"
                >
                    <Grid item xs={12} md={6} className={styles.left}>
                        <img src={pic} />
                    </Grid>
                    <Grid item xs={12} md={6} className={styles.right}>
                        <pre>HTTP 404 - NOT FOUND</pre>
                        <h1>This page doesn't exist.</h1>
                        <div className={styles.actions}>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={goBack}
                            >
                                <Icon>arrow_back</Icon>
                                <span className="spacer"></span>
                                <Typography variant="button">
                                    Go back
                                </Typography>
                            </Button>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={goHome}
                            >
                                <Icon>home</Icon>
                                <span className="spacer"></span>
                                <Typography variant="button">
                                    Go Home
                                </Typography>
                            </Button>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={goToContactUs}
                            >
                                <Icon>phone</Icon>
                                <span className="spacer"></span>
                                <Typography variant="button">
                                    Contact us
                                </Typography>
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export interface NotFoundProps {}

export default NotFound;
