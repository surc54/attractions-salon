import React from "react";
import styles from "./NotFound.module.scss";
import pic from "../../assets/undraw_lost_bqr2.svg";
import {
    Grid,
    Container,
    useMediaQuery,
    useTheme,
    Button,
    Icon,
    Typography,
} from "@material-ui/core";
import clsx from "clsx";

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
                            <Button color="primary" variant="outlined">
                                <Icon>arrow_back</Icon>
                                <span className="spacer"></span>
                                <Typography variant="button">
                                    Go back
                                </Typography>
                            </Button>
                            <Button color="primary" variant="outlined">
                                <Icon>home</Icon>
                                <span className="spacer"></span>
                                <Typography variant="button">
                                    Go Home
                                </Typography>
                            </Button>
                            <Button color="primary" variant="outlined">
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
