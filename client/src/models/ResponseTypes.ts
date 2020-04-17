export interface GenericApiResponse<Data = any, Code = string> {
    status: "ok" | "error";
    code: Code | "error" | "forbidden";
    data?: Data;
    error?: any;
}

export interface ApiResponseUser {
    name: {
        first: string;
        last: string;
    };
    emailVerified: boolean;
    role: "Guest" | "Admin" | "Owner";
    _id: string;
    email: string;
    __v?: number;
    fullName: string;
    id: string;
    phone?: string;
}

export interface GetAuthInfoResponse
    extends GenericApiResponse<undefined, "auth/info/success"> {
    signedIn?: boolean;
    user?: ApiResponseUser | null;
}

export interface LoginResponse
    extends GenericApiResponse<
        undefined,
        | "auth/sign-in/already-signed-in"
        | "auth/sign-in/failure"
        | "auth/sign-in/success"
    > {
    user?: ApiResponseUser;
}

export type LogoutResponse = GenericApiResponse<
    undefined,
    "auth/sign-out/success" | "auth/sign-out/not-signed-in"
>;

export type SignUpResponse = GenericApiResponse<
    undefined,
    | "auth/sign-up/email-illegal-format"
    | "auth/sign-up/success"
    | "auth/sign-up/unknown-error"
    | "auth/sign-up/phone-invalid"
>;

// admin user setting types

export interface AdminUserListResponse
    extends GenericApiResponse<
        ApiResponseUser[],
        | "admin/user/list/success"
        | "admin/user/list/invalid-search"
        | "admin/user/list/error"
    > {
    page?: number;
    count?: number;
}

export type AdminUserInfoResponse = GenericApiResponse<
    ApiResponseUser,
    | "admin/user/info/missing-uid"
    | "admin/user/info/uid-illegal-format"
    | "admin/user/info/success"
    | "admin/user/info/error"
>;

export type AdminUserUpdateResponse = GenericApiResponse<
    ApiResponseUser,
    | "admin/user/update/body-required"
    | "admin/user/update/success"
    | "admin/user/update/error"
    | "admin/user/update/invalid-values"
    | "admin/user/update/phone-invalid"
>;

export type AdminUserDeleteResponse = GenericApiResponse<
    ApiResponseUser,
    | "admin/user/delete/missing-uid"
    | "admin/user/delete/no-user"
    | "admin/user/delete/success"
    | "admin/user/delete/error"
    | "admin/user/delete/cannot-delete-self"
>;

export type EzSettingGetResponse = GenericApiResponse<
    {
        _id: string;
        key: string;
        value: string;
    },
    | "ez-settings/get/missing-key"
    | "ez-settings/get/bad-key"
    | "ez-settings/get/not-found"
    | "ez-settings/get/error"
    | "ez-settings/get/success"
>;

export type EzSettingSetResponse = GenericApiResponse<
    {
        key: string;
        value: string;
    },
    | "ez-settings/set/missing-key"
    | "ez-settings/set/missing-value"
    | "ez-settings/set/bad-key"
    | "ez-settings/set/error"
    | "ez-settings/set/success"
>;
