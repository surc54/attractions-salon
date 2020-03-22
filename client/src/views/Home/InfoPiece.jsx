import React from "react";
import { Paper, ButtonBase, Icon } from "@material-ui/core";
import styles from "./InfoPiece.module.scss";
import clsx from "clsx";

const InfoPiece = ({
    icon,
    className,
    maxWidth,
    style,
    children,
    ...others
}) => {
    let actualIcon = icon;

    if (typeof icon === "string") {
        actualIcon = <Icon color="primary">{icon}</Icon>;
    }

    return (
        <ButtonBase
            style={{
                ...style,
                maxWidth: maxWidth || 480,
            }}
            className={clsx(styles.infoPieceBase, className)}
            {...others}
        >
            <Paper elevation={0} className={styles.paper}>
                <div className={styles.icon}>{actualIcon}</div>
                <div className={styles.children}>{children}</div>
            </Paper>
        </ButtonBase>
    );
};

export default InfoPiece;
