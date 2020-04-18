import { AxiosRequestConfig } from "axios";

type HttpMethod =
    | "GET"
    | "DELETE"
    | "HEAD"
    | "OPTIONS"
    | "POST"
    | "PUT"
    | "PATCH"
    | "LINK"
    | "UNLINK";

interface IConfig {
    apiUrls: {
        [desc: string]: AxiosRequestConfig;
    };
    theme: {
        [desc: string]: any;
    };
    adminPage: {
        rolesAllowed: string[];
        [tag: string]: any;
    };
    [tag: string]: any;
}

const noCache = { "Cache-Control": "no-cache" };

const Config: IConfig = {
    apiUrls: {
        "get account info": {
            url: "/api/account",
            method: "GET",
            headers: {
                ...noCache,
            },
        },
        "logout user": {
            url: "/api/account/logout",
            method: "GET",
            headers: {
                ...noCache,
            },
        },
        "login user": {
            url: "/api/account",
            method: "POST",
            headers: {
                ...noCache,
            },
        },
        "signup user": {
            url: "/api/account",
            method: "PUT",
            headers: {
                ...noCache,
            },
        },
        "admin - get user list": {
            url: "/api/admin/account",
            method: "POST",
            headers: {
                ...noCache,
            },
        },
        "admin - get user": {
            baseURL: "/api/admin/account/",
            method: "GET",
            headers: {
                ...noCache,
            },
        },
        "admin - delete user": {
            baseURL: "/api/admin/account/",
            method: "DELETE",
            headers: {
                ...noCache,
            },
        },
        "admin - update user": {
            baseURL: "/api/admin/account/",
            method: "POST",
            headers: {
                ...noCache,
            },
        },
        "get services info": {
            url: "/api/services",
            method: "GET",
            headers: {
                ...noCache,
            },
        },
        "update a service": {
            baseURL: "/api/admin/services/",
            method: "POST",
            headers: {
                ...noCache,
            },
        },
        "create a service": {
            baseURL: "/api/admin/services/",
            method: "PUT",
            headers: {
                ...noCache,
            },
        },
        "delete a service": {
            baseURL: "/api/admin/services/",
            method: "DELETE",
            headers: {
                ...noCache,
            },
        },
    },
    theme: {
        palette: {
            primary: {
                main: "#E7A1AF",
            },
        },
        typography: {
            htmlFontSize: 10,
        },
    },
    adminPage: {
        rolesAllowed: ["Admin", "Owner"],
    },
};

export default Config;
