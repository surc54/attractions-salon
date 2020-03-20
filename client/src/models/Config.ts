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
        [desc: string]: {
            url: string;
            method: HttpMethod;
        };
    };
    [tag: string]: any;
}

const Config: IConfig = {
    apiUrls: {
        "get account info": {
            url: "/api/account",
            method: "GET",
        },
        "logout user": {
            url: "/api/account/logout",
            method: "GET",
        },
        "login user": {
            url: "/api/account",
            method: "POST",
        },
    },
};

export default Config;
