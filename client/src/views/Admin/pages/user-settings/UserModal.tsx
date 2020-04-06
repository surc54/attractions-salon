import React from "react";
import {
    Dialog,
    DialogProps,
    DialogTitle,
    LinearProgress,
    Typography,
    IconButton,
    Icon,
    Container,
    DialogContent,
    Button,
    ButtonBase,
    ButtonBaseProps,
    DialogActions,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
} from "@material-ui/core";
import _ from "lodash";
import clsx from "clsx";
import User from "../../../../models/User";
import styles from "./UserModal.module.scss";
import { useSnackbar } from "notistack";
import history from "../../../../models/history";
import { useUserAuth } from "../../../../hooks";

const UserModal: React.FC<UserModalProps> = ({
    user,
    className,
    ...others
}) => {
    const loading = false;

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            className={clsx(styles.dialog, className)}
            classes={{
                paper: styles.dialogPaper,
            }}
            {...others}
        >
            <LinearProgress
                variant={loading ? "indeterminate" : "determinate"}
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
                        </Typography>
                    </div>

                    <span className="spacer" />

                    <Button color="primary">
                        <Icon style={{ marginRight: 8 }}>edit</Icon>
                        Edit
                    </Button>
                </header>

                <section className={styles.contactInfo}>
                    <Typography component="h2" variant="button">
                        Contact Information
                    </Typography>
                    <div className={styles.content}>
                        {user?.phone && (
                            <ContactItem icon="phone">{user.phone}</ContactItem>
                        )}
                        {user?.email && (
                            <ContactItem icon="email">{user.email}</ContactItem>
                        )}
                        {!user?.phone && !user?.email && (
                            <Typography variant="body1">
                                Looks like there's nothing here.
                            </Typography>
                        )}
                    </div>
                </section>

                <section>
                    <Typography component="h2" variant="button">
                        Appointments
                    </Typography>
                    <pre>No content</pre>
                </section>

                <section className={styles.adminTasks}>
                    <Typography component="h2" variant="button">
                        Administrator Tasks
                    </Typography>
                    <AdminSection user={user} />
                </section>

                <section className={styles.dialogActions}>
                    <Button color="primary">Okay</Button>
                </section>
            </DialogContent>
        </Dialog>
    );
};

export interface UserModalProps extends Omit<DialogProps, "children"> {
    user?: User | null;
}

export default UserModal;

const ContactItem: React.FC<ContactItemProps> = ({
    icon,
    className,
    children,
    ...others
}) => {
    return (
        <ButtonBase className={clsx(styles.contactItem, className)} {...others}>
            <Icon className={styles.icon}>{icon}</Icon>
            {children}
        </ButtonBase>
    );
};

interface ContactItemProps extends ButtonBaseProps {
    icon: string | JSX.Element;
}

const adminActions = (
    user: User
): {
    id: string;
    condition?: ((x: User) => boolean) | boolean;
    displayName: string;
    description?: string | JSX.Element;
    onClick?: () => void;
}[] => [
    {
        id: "email-user",
        condition: Boolean(user.email),
        displayName: "Email user",
        description:
            'Send an email to this user\'s email. You will be redirected to the "Email" section in the admin page.',
        onClick: () => {
            history.push("/admin/misc/email/" + encodeURIComponent(user.email));
        },
    },
    {
        id: "text-user",
        condition: Boolean(user.phone),
        displayName: "Text user",
        description:
            'Send an text to this user\'s phone number. You will be redirected to the "Text Messages" section in the admin page.',
    },
    {
        id: "delete-user",
        displayName: "Delete user",
        description: (
            <>
                WARNING: This is a destructive action! There is no coming back!
                <br />
                <br />
                This will delete the user from the database.
            </>
        ),
    },
];

const AdminSection: React.FC<AdminSectionProps> = ({ user }) => {
    const [selected, setSelected] = React.useState<string>("");
    const userAuth = useUserAuth();
    const snack = useSnackbar();

    const unimplemented = () =>
        snack.enqueueSnackbar("This feature is not implemented.", {
            autoHideDuration: 3000,
        });

    if (!user) return null;

    const actions = adminActions(user);

    const item =
        selected !== "" ? actions.find((x) => x.id === selected) : null;

    return (
        <>
            <FormControl variant="outlined" className={styles.selectAdminTask}>
                <InputLabel id="admin-task-select-label">
                    Select Task
                </InputLabel>
                <Select
                    labelId="admin-task-select-label"
                    value={selected}
                    onChange={(e) => setSelected(String(e.target.value))}
                    label="Select Task"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {actions
                        .filter(
                            (x) =>
                                _.isNil(x.condition) ||
                                (typeof x.condition === "function"
                                    ? x.condition?.(userAuth.user as User)
                                    : x.condition)
                        )
                        .map((x) => (
                            <MenuItem key={x.id} value={x.id}>
                                {x.displayName}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
            <Typography variant="body1" className={styles.description}>
                {!item
                    ? "Select a task above to see an explanation and details on how to execute it."
                    : item.description || "No instructions provided."}
            </Typography>
            {item && (
                <div className={styles.actions}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={item.onClick || unimplemented}
                    >
                        Start Execution
                    </Button>
                    <Button variant="outlined" onClick={() => setSelected("")}>
                        Cancel
                    </Button>
                </div>
            )}
        </>
    );
};

interface AdminSectionProps {
    user?: User | null;
}
