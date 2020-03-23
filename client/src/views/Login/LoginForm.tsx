import React from "react";
import { TextField, Button, CircularProgress, Icon } from "@material-ui/core";
import styles from "./Login.module.scss";
import validator from "validator";

const updateTbState = (
    setter: (val: any) => void,
    value: any,
    errorSetter?: (val: any) => void
) => {
    setter(value);
    errorSetter?.("");
};

const LoginForm: React.FC<LoginFormProps> = ({
    onSubmit,
    defaultEmail = "",
    defaultPassword = "",
    loading = false,
    ...others
}) => {
    const [email, setEmail] = React.useState<string>("" || defaultEmail);
    const [emailError, setEmailError] = React.useState<string>("");
    const [passwordError, setPasswordError] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>(
        "" || defaultPassword
    );

    React.useLayoutEffect(() => {
        others.forceRender?.();
    });

    const onFormSubmit = (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();

        let error = false;

        if (!validator.isEmail(email)) {
            error = true;
            setEmailError("Email is not in a valid format.");
        }

        if (password.length === 0) {
            error = true;
            setPasswordError("Password must be specified.");
        }

        // others.forceRender?.();

        if (!error) onSubmit(email, password);
    };

    return (
        <form action="/api/login" method="POST" onSubmit={onFormSubmit}>
            <TextField
                autoFocus
                className={styles.input}
                label="Email"
                placeholder="member@example.com"
                type="text"
                variant="outlined"
                fullWidth
                required
                autoComplete="off"
                value={email}
                error={emailError !== ""}
                helperText={emailError}
                onChange={e =>
                    updateTbState(setEmail, e.target.value, setEmailError)
                }
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
                error={passwordError !== ""}
                helperText={passwordError}
                onChange={e =>
                    updateTbState(setPassword, e.target.value, setPasswordError)
                }
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

    forceRender?: any;

    onSubmit: (email: string, password: string) => void;
}

export default React.memo(LoginForm, (prev, next) => {
    return !["defaultEmail", "defaultPassword", "loading", "onSubmit"].some(
        m => prev[m as keyof LoginFormProps] !== next[m as keyof LoginFormProps]
    );
});
