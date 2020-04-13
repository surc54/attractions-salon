import {
    Button,
    ButtonBase,
    ButtonBaseProps,
    Chip,
    FormControl,
    Icon,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@material-ui/core";
import clsx from "clsx";
import copy from "copy-to-clipboard";
import _ from "lodash";
import { useSnackbar } from "notistack";
import React from "react";
import {
    AdminUserHook,
    useAdminUserSettings,
    useUserAuth,
} from "../../../../../hooks";
import User from "../../../../../models/User";
import { emsg } from "../../../../../tools";
import styles from "../UserModal.module.scss";

const UserView: React.FC<UserViewProps> = ({ user, onClose }) => {
    return (
        <>
            <section className={styles.contactInfo}>
                <Typography component="h2" variant="button">
                    Contact Information
                </Typography>
                <div className={styles.content}>
                    {user?.phone && (
                        <ContactItem
                            href={`tel:${user.phone}`}
                            copyText={user.phone}
                            icon="phone"
                        >
                            {user.phone}
                        </ContactItem>
                    )}
                    {user?.email && (
                        <ContactItem
                            href={`mailto:${user.email}`}
                            icon="email"
                            copyText={user.email}
                        >
                            {user.email}
                        </ContactItem>
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
                <Button color="primary" onClick={onClose}>
                    Okay
                </Button>
            </section>
        </>
    );
};

export interface UserViewProps {
    user: User;
    onClose?: () => void;
}

export default UserView;

const ContactItem: React.FC<ContactItemProps> = ({
    icon,
    className,
    children,
    href,
    copyText,
    onClick: clickCallback,
    ...others
}) => {
    const snack = useSnackbar();

    const onClick = (e: React.MouseEvent<any>) => {
        e.preventDefault();

        if (href) {
            window.location.href = href;
        }

        if (clickCallback) {
            clickCallback(e);
        }
    };

    const onCopyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (copyText) {
            copy(copyText);

            snack.enqueueSnackbar("Copied text to clipboard.", {
                autoHideDuration: 3000,
            });
        }
    };

    return (
        <ButtonBase
            component="div"
            className={clsx(styles.contactItem, className)}
            onClick={onClick}
            {...others}
        >
            <Icon className={styles.icon}>{icon}</Icon>
            {children}
            <span className="spacer"></span>
            {copyText && (
                <IconButton style={{ marginLeft: 18 }} onClick={onCopyClick}>
                    <Icon>link</Icon>
                </IconButton>
            )}
        </ButtonBase>
    );
};

interface ContactItemProps extends ButtonBaseProps<"div"> {
    icon: string | JSX.Element;
    copyText?: string | null;
    href?: string;
}

const adminActions = (
    user: User,
    userSettings: AdminUserHook
): {
    id: string;
    condition?: ((x: User) => boolean) | boolean;
    displayName: string;
    description?: string | JSX.Element;
    onClick?: () => Promise<any>;
}[] => [
    // unimplemented.
    // {
    //     id: "email-user",
    //     condition: Boolean(user.email),
    //     displayName: "Email user",
    //     description:
    //         'Send an email to this user\'s email. You will be redirected to the "Email" section in the admin page.',
    //     onClick: () => {
    //         history.push("/admin/misc/email/" + encodeURIComponent(user.email));
    //     },
    // },
    // {
    //     id: "text-user",
    //     condition: Boolean(user.phone),
    //     displayName: "Text user",
    //     description:
    //         'Send an text to this user\'s phone number. You will be redirected to the "Text Messages" section in the admin page.',
    // },
    {
        id: "change-role-to-guest",
        displayName: "Change role to Guest",
        condition: user.role !== "Guest",
        onClick: () =>
            userSettings.updateUser(user.id, {
                ...user,
                role: "Guest",
            }),
        description: (
            <>Change this person's permission role to Guest on this website.</>
        ),
    },
    {
        id: "change-role-to-admin",
        displayName: "Change role to Admin",
        condition: user.role !== "Admin",
        onClick: () => {
            return userSettings.updateUser(user.id, {
                ...user,
                role: "Admin",
            });
        },
        description: (
            <>Change this person's permission role to Admin on this website.</>
        ),
    },
    {
        id: "change-role-to-owner",
        condition: user.role !== "Owner",
        displayName: "Change role to Owner",
        onClick: () => {
            return userSettings.updateUser(user.id, {
                ...user,
                role: "Owner",
            });
        },
        description: (
            <>Change this person's permission role to Owner on this website.</>
        ),
    },
    {
        id: "delete-user",
        displayName: "Delete user",
        onClick: () => {
            return userSettings.deleteUser(user.id);
        },
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
    const userSettings = useAdminUserSettings();
    const snack = useSnackbar();

    const unimplemented = () =>
        snack.enqueueSnackbar("This feature is not implemented.", {
            autoHideDuration: 3000,
        });

    if (!user) return null;

    const actions = adminActions(user, userSettings);

    const item =
        selected !== "" ? actions.find((x) => x.id === selected) : null;

    const startExecution = (e: any) => {
        if (!item) return;

        if (item.onClick) {
            item.onClick()
                .catch((err) => {
                    snack.enqueueSnackbar(
                        `An error occurred: ${emsg({ err })}`,
                        {
                            variant: "error",
                            autoHideDuration: 4000,
                        }
                    );
                })
                .finally(() => setSelected(""));
        } else {
            unimplemented();
            setSelected("");
        }
    };

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
                        onClick={startExecution}
                        disabled={userSettings.loading}
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
