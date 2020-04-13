import {
    Button,
    Chip,
    Dialog,
    DialogContent,
    DialogProps,
    Icon,
    LinearProgress,
    Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useAdminUserSettings } from "../../../../hooks";
import User from "../../../../models/User";
import UserEdit from "./modal/UserEdit";
import UserView from "./modal/UserView";
import styles from "./UserModal.module.scss";

const UserModal: React.FC<UserModalProps> = ({
    user,
    className,
    onClose,
    ...others
}) => {
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const userSettings = useAdminUserSettings();

    React.useEffect(() => {
        if (!user) {
            onClose?.();
        }
    }, [user]);

    return (
        <Dialog
            fullWidth
            // maxWidth="md"
            className={clsx(styles.dialog, className)}
            classes={{
                paper: styles.dialogPaper,
            }}
            onClose={() => {
                setEditMode(false);
                onClose?.();
            }}
            {...others}
        >
            <LinearProgress
                variant={userSettings.loading ? "indeterminate" : "determinate"}
                value={0}
            />
            <DialogContent className={styles.dialogContent}>
                <header className={styles.header}>
                    <div>
                        <Typography variant="button" color="primary">
                            User Profile
                        </Typography>
                        <Typography component="h1" className={styles.title}>
                            {user?.fullName}
                            <Chip
                                label={user?.role}
                                color={
                                    user?.role === "Guest"
                                        ? "default"
                                        : "primary"
                                }
                                style={{ marginLeft: 10 }}
                            />
                        </Typography>
                    </div>

                    <span className="spacer" />

                    <Button
                        color={editMode ? "default" : "primary"}
                        variant={editMode ? "outlined" : "text"}
                        onClick={() => setEditMode(!editMode)}
                    >
                        {!editMode && (
                            <Icon style={{ marginRight: 8 }}>edit</Icon>
                        )}
                        {editMode ? "Cancel" : "Edit"}
                    </Button>
                </header>
                {!user ? (
                    "No user"
                ) : editMode ? (
                    <UserEdit
                        originalUser={user}
                        onSave={() => setEditMode(false)}
                    />
                ) : (
                    <UserView user={user} onClose={onClose} />
                )}
            </DialogContent>
        </Dialog>
    );
};

export interface UserModalProps
    extends Omit<Omit<DialogProps, "children">, "onClose"> {
    user?: User | null;
    onClose?: () => void;
}

export default UserModal;
