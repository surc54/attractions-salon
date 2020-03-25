import {
    Button,
    CircularProgress,
    Grid,
    Icon,
    InputAdornment,
    TextField,
} from "@material-ui/core";
import React from "react";
import { OnSubmit, useForm, Validate } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import validator from "validator";
import { useUserAuth } from "../../hooks";
import { SignUpData } from "../../models/User";
import { emsg } from "../../tools";
import { useSnackbar } from "notistack";
import styles from "./SignUpForm.module.scss";
import { useHistory } from "react-router-dom";

const REQUIRED_VALIDATION = {
    required: "This field is required",
};

const NAME_LENGTH_VALIDATION = {
    maxLength: {
        value: 24,
        message: "Value must be less than 24 characters",
    },
};

const validatePhoneNumber: Validate = val => {
    if (val === "") return true;

    if (val.length >= 10 && val.length <= 14 && validator.isMobilePhone(val)) {
        return true;
    }

    return "Invalid phone number";
};

const validateEmail: Validate = val => {
    return validator.isEmail(val) || "Invalid email";
};

const SignUpForm: React.FC<SignUpFormProps> = ({ loading, forceRender }) => {
    const userAuth = useUserAuth();
    const snack = useSnackbar();
    const history = useHistory();
    const [resetRecaptcha, setResetRecaptcha] = React.useState<boolean>(false);
    const recaptchaRef = React.createRef<ReCAPTCHA>();
    const { register, errors, handleSubmit } = useForm<SignUpData>({
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
        },
    });

    React.useLayoutEffect(() => {
        forceRender?.();
    });

    React.useLayoutEffect(() => {
        if (resetRecaptcha && recaptchaRef.current) {
            recaptchaRef.current.reset();
            setResetRecaptcha(false);
        }
    }, [recaptchaRef, resetRecaptcha]);

    const onFormSubmit: OnSubmit<SignUpData> = async data => {
        if (!recaptchaRef.current) {
            snack.enqueueSnackbar("ReCAPTCHA unavailable. Try again later.", {
                autoHideDuration: 5000,
            });
            return;
        }

        const token = recaptchaRef.current.getValue();

        if (!token) {
            snack.enqueueSnackbar("ReCAPTCHA is required. Try again.", {
                autoHideDuration: 5000,
            });
            return;
        }

        userAuth
            .signUp({
                ...data,
                recaptchaToken: token,
            })
            .then(() => {
                snack.enqueueSnackbar(
                    "Successfully signed up. Welcome, " + data.firstName + "!",
                    {
                        variant: "success",
                        autoHideDuration: 4000,
                    }
                );

                history.push("/login", {
                    email: data.email,
                });
            })
            .catch(err => {
                snack.enqueueSnackbar("An error occurred: " + emsg(err), {
                    autoHideDuration: 5000,
                    variant: "error",
                });
                setResetRecaptcha(true);
            });
    };

    return (
        <form
            action="/api/login"
            method="POST"
            className={styles.form}
            onSubmit={handleSubmit(onFormSubmit)}
        >
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <TextField
                        className={styles.input}
                        name="firstName"
                        inputRef={register({
                            ...REQUIRED_VALIDATION,
                            ...NAME_LENGTH_VALIDATION,
                        })}
                        required
                        autoFocus
                        label="First Name"
                        placeholder="John"
                        type="text"
                        variant="outlined"
                        fullWidth
                        autoComplete="off"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        disabled={loading}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        className={styles.input}
                        name="lastName"
                        inputRef={register({
                            ...REQUIRED_VALIDATION,
                            ...NAME_LENGTH_VALIDATION,
                        })}
                        required
                        label="Last Name"
                        placeholder="Doe"
                        type="text"
                        variant="outlined"
                        fullWidth
                        // required
                        autoComplete="off"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        disabled={loading}
                    />
                </Grid>
            </Grid>
            <TextField
                className={styles.input}
                name="phone"
                inputRef={register({
                    validate: validatePhoneNumber,
                })}
                label="Phone number"
                placeholder="(800) 123 4567"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">{"+1"}</InputAdornment>
                    ),
                }}
                type="tel"
                variant="outlined"
                fullWidth
                autoComplete="off"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                disabled={loading}
            />
            <TextField
                className={styles.input}
                name="email"
                inputRef={register({
                    ...REQUIRED_VALIDATION,
                    validate: validateEmail,
                })}
                required
                label="Email"
                placeholder="member@example.com"
                type="email"
                variant="outlined"
                fullWidth
                // required
                autoComplete="off"
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={loading}
            />
            <TextField
                className={styles.input}
                name="password"
                inputRef={register({
                    ...REQUIRED_VALIDATION,
                    minLength: {
                        value: 8,
                        message: "Must be atleast 8 characters",
                    },
                })}
                required
                label="Password"
                placeholder="••••••••••••"
                type="password"
                variant="outlined"
                fullWidth
                // required
                autoComplete="off"
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={loading}
            />
            <div className={styles.recaptcha}>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6Le9zuMUAAAAAE6pAtVkhrOoRrMaycB9b-hdA53b"
                />
            </div>
            <div className={styles.actions}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    type="submit"
                    className={styles.submitButton}
                >
                    <span style={{ marginTop: 2 }}>Sign up</span>
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

export interface SignUpFormProps {
    onSubmit?: (data: SignUpData) => void;
    loading?: boolean;

    forceRender?: any;
}

export default React.memo(SignUpForm, (prev, next) => {
    return !["onSubmit", "loading"].some(
        m =>
            prev[m as keyof SignUpFormProps] !==
            next[m as keyof SignUpFormProps]
    );
});

// declare const grecaptcha: any;
