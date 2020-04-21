import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/Header/NavBar";
import Home from "./views/Home/Home";
import Testimonials from "./views/Testimonials/Testimonials";
import NotFound from "./views/404/NotFound";
import Book from "./views/Book/Book.jsx";
import Payments from "./views/Payments/Payments";
import Services from "./views/Services/Services";
import Login from "./views/Login/Login";
import { useUserAuth } from "./hooks";
import AdminBase from "./views/Admin/Base";

const routes = [
    {
        exact: true,
        path: "/",
        component: Home,
    },
    {
        exact: false,
        path: "/services",
        component: Services,
    },
    {
        exact: false,
        path: "/book",
        component: Book,
    },
    {
        exact: false,
        path: "/payments",
        component: Payments,
    },
    {
        exact: false,
        path: "/testimonials",
        component: Testimonials,
    },
    {
        exact: false,
        path: "/login",
        component: Login,
    },
    {
        exact: false,
        path: "/admin",
        component: AdminBase,
    },
];

const App = () => {
    const userAuth = useUserAuth();

    React.useEffect(() => {
        // Initial update - get user status
        setTimeout(() => userAuth.updateInfo(), 1000);
    }, []);

    return (
        <>
            <NavBar />
            <Switch>
                {routes.map((r) => (
                    <Route
                        key={r.path}
                        exact={!!r.exact}
                        path={r.path}
                        component={r.component}
                    />
                ))}
                <Route component={NotFound} />
            </Switch>
        </>
    );
};

export default App;
