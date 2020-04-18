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
        [desc: string]: AxiosRequestConfig & { url: string };
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
        "get services info": {
            url: "/api/services",
            method: "GET",
            headers: {
                ...noCache,
            },
        },
        "get photos info": {
            url: "/api/photos",
            method: "GET",
            headers: {
                ...noCache,
            }
        },
        "add photos info": {
            url: "/api/photos",
            method: "PUT",
            headers: {
                ...noCache,
            }
        },
        "get stylist info": {
            url: "/api/stylists",
            method: "GET",
            headers: {
                ...noCache,
            }
        },
        "add stylist info": {
            url: "/api/stylists",
            method: "PUT",
            headers: {
                ...noCache,
            }
        },
        "ez-settings - get": {
            url: "/api/admin/ez-setting",
            method: "GET",
            headers: {
                ...noCache,
            },
        },
        "ez-settings - set": {
            url: "/api/admin/ez-setting",
            method: "PUT",
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
