const CODE_TRANSLATIONS: {
    [code: string]: string;
} = {
    error: "Unknown error",

    // Signing in
    "auth/sign-in/already-signed-in": "You are already signed in!",
    "auth/sign-in/failure": "Could not sign in. Check your credentials.",
    "auth/sign-in/success": "Signed in successfully!",

    // Signing out
    "auth/sign-out/not-signed-in": "You aren't signed in.",
    "auth/sign-out/success": "Signed out successfully!",

    // Signing up
    "auth/sign-up/email-illegal-format": "Email is in an invalid format.",
    "auth/sign-up/unknown-error": "Could not sign up.",
    "auth/sign-up/phone-invalid": "Phone number is in an invalid format.",
    "auth/sign-up/success": "Signed up successfully!",

    // User Settings (Admin) - Get List
    "admin/user/list/invalid-search":
        "Invalid search applied. Check your query.",
    "admin/user/list/error": "Could not list users.",
    "admin/user/list/success": "Listed users successfully!",

    // User Settings (Admin) - Get Info
    "admin/user/info/missing-uid": "User ID was not provided.",
    "admin/user/info/uid-illegal-format": "User ID is invalid.",
    "admin/user/info/success": "User information successfully retrieved.",
    "admin/user/info/error": "Could not retrieve user information.",

    // User Settings (Admin) - Update User
    "admin/user/update/body-required": "User update parameters required.",
    "admin/user/update/success": "Successfully updated user.",
    "admin/user/update/error": "Could not update user.",
    "admin/user/update/invalid-values": "User data contains invalid values.",
    "admin/user/update/phone-invalid": "Phone number is in an invalid format.",
    "admin/user/update/role-change-only-owner": "Only owners can change roles.",

    // User Settings (Admin) - Delete User
    "admin/user/delete/missing-uid": "User ID was not provided.",
    "admin/user/delete/no-user": "Could not find specified user.",
    "admin/user/delete/success": "Deleted user successfully.",
    "admin/user/delete/error": "Could not delete user.",
    "admin/user/delete/cannot-delete-self": "You cannot delete yourself.",

    // EzSettings (Admin) - Get Setting
    "ez-settings/get/missing-key": "Setting Key was not provided.",
    "ez-settings/get/bad-key": "Setting Key is invalid.",
    "ez-settings/get/not-found": "Could not find specified setting.",
    "ez-settings/get/error": "Could not get setting.",
    "ez-settings/get/success": "Successfully retrived setting.",

    // EzSettings (Admin) - Set Setting
    "ez-settings/set/missing-key": "Setting Key was not provided.",
    "ez-settings/set/missing-value": "Setting Value was not provided.",
    "ez-settings/set/bad-key": "Setting Key is invalid.",
    "ez-settings/set/error": "Could not set setting.",
    "ez-settings/set/success": "Successfully set setting.",
};

export const emsg = (params: {
    err?: any;
    error?: any;
    code?: string;
    message?: string;
}): string => {
    if (!params) {
        return "Unknown error";
    }

    const { err, error, code, message } = params;

    if (message) return message;

    const e = err ?? error;

    if (code) {
        if (typeof e === "string") return e;

        return CODE_TRANSLATIONS[code] || `Unknown Error (${code})`;
    }

    return (
        (typeof e?.message === "string" && e.message) ||
        (typeof e?.errmsg === "string" && e.errmsg) ||
        (typeof e === "string" && e) ||
        "Unknown error"
    );
};
