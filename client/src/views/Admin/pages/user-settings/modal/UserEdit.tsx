import { Button, Grid, TextField, Typography } from "@material-ui/core";
import _ from "lodash";
import { useSnackbar } from "notistack";
import React from "react";
import { useAdminUserSettings } from "../../../../../hooks";
import User from "../../../../../models/User";
import { emsg } from "../../../../../tools";

const UserEdit: React.FC<UserEditProps> = ({ originalUser, onSave }) => {
    const [dirty, setDirty] = React.useState<boolean>(false);
    const snack = useSnackbar();
    const [editedUser, setEditedUser] = React.useState<{
        name: {
            first: string;
            last: string;
        };
        email: string;
        phone?: string;
    }>(
        _.pick(originalUser, "name.first", "name.last", "email", "phone") as any
    );
    const userSettings = useAdminUserSettings();

    const save = () => {
        userSettings
            .updateUser(
                originalUser.id,
                _.defaultsDeep(editedUser, originalUser)
            )
            .then(() => onSave())
            .catch((err) => {
                snack.enqueueSnackbar(`Error: ${emsg({ err })}`, {
                    variant: "error",
                    autoHideDuration: 5000,
                });
            });
    };

    const updateField = (editedItem: string) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (!dirty) setDirty(true);

        switch (editedItem) {
            case "firstName":
            case "lastName": {
                setEditedUser({
                    ...editedUser,
                    name: {
                        ...editedUser.name,
                        [editedItem === "firstName" ? "first" : "last"]: e
                            .target.value,
                    },
                });
                break;
            }
            case "email": {
                setEditedUser({
                    ...editedUser,
                    email: e.target.value,
                });
                break;
            }
            case "phone": {
                setEditedUser({
                    ...editedUser,
                    phone: e.target.value,
                });
                break;
            }
        }
    };

    return (
        <>
            <section>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            onChange={updateField("firstName")}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: 18 }}
                            label="First Name"
                            value={editedUser.name.first}
                        />
                        <TextField
                            onChange={updateField("lastName")}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: 18 }}
                            label="Last Name"
                            value={editedUser.name.last}
                        />
                        <TextField
                            onChange={updateField("email")}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: 18 }}
                            label="Email"
                            value={editedUser.email}
                        />
                        <TextField
                            onChange={updateField("phone")}
                            variant="outlined"
                            fullWidth
                            label="Phone"
                            value={editedUser.phone}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        style={{
                            display: "flex",
                            flexFlow: "column nowrap",
                            justifyContent: "flex-start",
                            alignItems: "stretch",
                        }}
                    >
                        <Typography variant="body1">
                            When you finish editing, hit save to send the new
                            data to the database.
                            <br />
                            <br />
                            Don't want to save? Press cancel instead.
                        </Typography>
                        <span className="spacer"></span>
                        <Button
                            variant="contained"
                            style={{ marginTop: 24 }}
                            fullWidth
                            color="primary"
                            onClick={save}
                            disabled={!dirty || userSettings.loading}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </section>
        </>
    );
};

export interface UserEditProps {
    originalUser: User;
    onSave: () => void;
}

export default UserEdit;
