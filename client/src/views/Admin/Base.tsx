import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import styles from "./Base.module.scss";
import InitialLoader from "./initial-loader/InitialLoader";

const AdminBase: React.FC<AdminBaseProps> = () => {
    const history = useHistory();
    const location = useLocation();

    React.useEffect(() => {
        history.replace(
            history.location.pathname +
                history.location.search +
                history.location.hash,
            {
                ...location.state,
                navbarSettings: {
                    ...(location.state as any)?.navbarSettings,
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
                    ...location.state,
                    navbarSettings: {
                        ...(location.state as any)?.navbarSettings,
                        disable: false,
                    },
                }
            );
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.wrapper}>
            <AdminSidebar />
        </div>
    );
};

export interface AdminBaseProps {}

export default AdminBase;
