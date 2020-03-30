import React from "react";
import {
    Dialog,
    DialogProps,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@material-ui/core";

const InfoDialog: React.FC<InfoDialogProps> = ({
    fullWidth = true,
    maxWidth = "xs",
    onClose,
    children,
    title,
    ...others
}) => {
    return (
        <Dialog
            {...others}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            onClose={onClose}
        >
            <DialogTitle>{title || "No title"}</DialogTitle>
            <DialogContent>{children || "No content"}</DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => onClose?.()}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export interface InfoDialogProps extends Omit<DialogProps, "onClose"> {
    onClose?: () => void;
    title: string;
}

export default InfoDialog;
