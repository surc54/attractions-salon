import React from "react";
import { TextField, Button, CircularProgress, Icon } from "@material-ui/core";
import styles from "./Login.module.scss";
import validator from "validator";

const updateTbState = (setter: (val: any) => void, value: any) => setter(value);

const LoginForm: React.FC<LoginFormProps> = ({
    onSubmit,
    defaultEmail = "",
    defaultPassword = "",
    loading = false,
}) => {
    const [email, setEmail] = React.useState<string>("" || defaultEmail);
    const [password, setPassword] = React.useState<string>(
        "" || defaultPassword
    );

    const onFormSubmit = (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();

        if (!validator.isEmail(email)) {
            alert("Email is invalid");
        } else if (password.length === 0) {
            alert("Password must be specified");
        } else {
            onSubmit(email, password);
        }
    };

    return (
        <form action="/api/login" method="POST" onSubmit={onFormSubmit}>
            <TextField
                className={styles.input}
                label="Email"
                placeholder="member@example.com"
                type="text"
                variant="outlined"
                fullWidth
                required
                autoComplete="off"
                value={email}
                onChange={e => updateTbState(setEmail, e.target.value)}
                disabled={loading}
            />
            <TextField
                className={styles.input}
                label="Password"
                placeholder="••••••••••••"
                type="password"
                variant="outlined"
                fullWidth
                required
                autoComplete="off"
                value={password}
                onChange={e => updateTbState(setPassword, e.target.value)}
                disabled={loading}
            />

            <div className={styles.actions}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    type="submit"
                    onClick={onFormSubmit}
                    className={styles.submitButton}
                >
                    <span style={{ marginTop: 2 }}>Sign in</span>
                    <span className="spacer"></span>
                    {loading ? (
                        <CircularProgress color="inherit" size={20} />
                    ) : (
                        <Icon>arrow_forward</Icon>
                    )}
                </Button>
            </div>
        </form>
    );
};

interface LoginFormProps {
    defaultEmail?: string;
    defaultPassword?: string;
    loading?: boolean;

    onSubmit: (email: string, password: string) => void;
}

export default LoginForm;
