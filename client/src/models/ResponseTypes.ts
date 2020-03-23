export interface GenericApiResponse<Data = any, Code = string> {
    status: "ok" | "error";
    code: Code | "error";
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
