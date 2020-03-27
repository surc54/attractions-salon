import { History } from "history";

export const disableNavbarForPage = (history: History<any>) => {
    return () => {
        history.replace(
            history.location.pathname +
                history.location.search +
                history.location.hash,
            {
                ...history.location.state,
                navbarSettings: {
                    ...history.location.state?.navbarSettings,
                    disable: true,
                },
            }
        );

        return () => {
            history.replace(
                history.location.pathname +
                    history.location.search +
                    history.location.hash,
                {
                    ...history.location.state,
                    navbarSettings: {
                        ...history.location.state?.navbarSettings,
                        disable: false,
                    },
                }
            );
        };
    };
};

export interface NavbarSettings {
    disable: boolean;
    style: "default" | "dark" | "light";
    transparent: boolean;
}
