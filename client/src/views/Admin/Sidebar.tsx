import React from "react";
import {
    IconButton,
    Icon,
    Button,
    Tooltip,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Divider,
} from "@material-ui/core";
import clsx from "clsx";
import { Location } from "history";
import bottomImg from "../../assets/admin-sidebar-bottom.svg";
import styles from "./Sidebar.module.scss";
import history from "../../models/history";
import AccountQuickView from "./AccountQuickView";
import { useUserAuth } from "../../hooks";
import { useSnackbar } from "notistack";

const items: SidebarItem[] = [
    {
        type: "link",
        text: "Dashboard",
        path: "/admin",
        match: "equalsPath",
    },
    {
        type: "section",
        text: "Page Settings",
        items: [
            {
                type: "link",
                text: "Home page",
                path: "/admin/page/home",
                match: "startsWithPath",
            },
            {
                type: "link",
                text: "Services page",
                path: "/admin/page/services",
                match: "startsWithPath",
            },
            {
                type: "link",
                text: "Book Now page",
                path: "/admin/page/book-now",
                match: "startsWithPath",
            },
            {
                type: "link",
                text: "Payments page",
                path: "/admin/page/payments",
                match: "startsWithPath",
            },
            {
                type: "link",
                text: "Testimonials page",
                path: "/admin/page/testimonials",
                match: "startsWithPath",
            },
            {
                type: "link",
                text: "Login page",
                path: "/admin/page/login",
                match: "startsWithPath",
            },
        ],
    },
    {
        type: "section",
        text: "Miscellaneous",
        items: [
            {
                type: "link",
                text: "Users",
                path: "/admin/misc/users",
                match: "startsWithPath",
            },
        ],
    },
];

type SidebarItem = SidebarSection | SidebarLink;

interface SidebarSection {
    key?: string;
    type: "section";
    text: string;
    items: SidebarItem[];
}

interface SidebarLink {
    key?: string;
    type: "link";
    text:
        | string
        | {
              primary: string;
              secondary: string;
          };
    path: string;
    external?: boolean;
    match?: ((location: Location) => boolean) | "startsWithPath" | "equalsPath";
}

const spacer = (val: number) => {
    return <span style={{ minWidth: val, display: "inline-block" }}></span>;
};

const mapSidebarItemsToJSX = (
    items: SidebarItem[],
    depth: number = 0
): any[] => {
    return items.map(item => {
        if (item.type === "section") {
            return [
                <Divider key="" />,
                <ListSubheader
                    key={item.key || "section_" + item.text}
                    className={styles.subheader}
                    disableSticky
                >
                    {item.text}
                </ListSubheader>,
                ...mapSidebarItemsToJSX(item.items, depth + 1),
            ];
        } else {
            let selected = false;
            if (item.match) {
                if (item.match === "startsWithPath") {
                    selected = history.location.pathname.startsWith(item.path);
                } else if (item.match === "equalsPath") {
                    selected = history.location.pathname === item.path;
                } else if (typeof item.match === "function") {
                    selected = item.match(history.location);
                }
            }
            return (
                <ListItem
                    button
                    selected={selected}
                    key={item.key || item.path}
                    onClick={e => {
                        e.preventDefault();
                        if (item.external) {
                            window.location.href = item.path;
                        } else {
                            history.push(item.path);
                        }
                    }}
                >
                    {typeof item.text === "string" ? (
                        <ListItemText
                            primary={
                                <>
                                    {spacer(depth * 20)}
                                    {item.text}
                                </>
                            }
                        />
                    ) : (
                        <ListItemText
                            primary={
                                <>
                                    {spacer(depth * 20)}
                                    {item.text.primary}
                                </>
                            }
                            secondary={
                                <>
                                    {spacer(depth * 20)}
                                    {item.text.secondary}
                                </>
                            }
                        />
                    )}
                </ListItem>
            );
        }
    });
};

const goHome = () => {
    history.push("/");
};

const goBack = () => {
    if (history.length === 0) {
        goHome();
    } else {
        history.goBack();
    }
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({
    className,
    ...others
}) => {
    const userAuth = useUserAuth();
    const snack = useSnackbar();

    const onLogout = () => {
        userAuth
            .logout()
            .then(() => {
                history.push("/");
                snack.enqueueSnackbar("Logged out successfully.", {
                    autoHideDuration: 5000,
                });
            })
            .catch(err => {
                history.push("/");
                snack.enqueueSnackbar(
                    "Something went wrong. There is a possibility that you were not logged out.",
                    {
                        autoHideDuration: 10000,
                        variant: "error",
                    }
                );
            });
    };

    return (
        <div className={clsx(styles.wrapper, className)} {...others}>
            <header className={styles.header}>
                <Tooltip title="Go back" enterDelay={300}>
                    <IconButton onClick={goBack}>
                        <Icon>arrow_back</Icon>
                    </IconButton>
                </Tooltip>
                <Button onClick={goHome}>
                    <h1>Attractions Salon</h1>
                </Button>
            </header>
            <div className={clsx(styles.content, "scroll-bar")}>
                <List>{mapSidebarItemsToJSX(items)}</List>
            </div>
            <div className={styles.account}>
                <AccountQuickView onLogout={onLogout} />
            </div>
            <img src={bottomImg} alt="bottomImg" className={styles.bottomBgImage} />
        </div>
    );
};

export interface AdminSidebarProps extends React.HTMLProps<HTMLDivElement> {}

export default AdminSidebar;
