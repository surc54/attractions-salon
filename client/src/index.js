import "normalize.css/normalize.css";
import "./components/global.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import history from "./models/history";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import 'semantic-ui-css/semantic.min.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#E7A1AF",
        },
    },
    typography: {
        htmlFontSize: 10,
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Router history={history}>
            <App />
        </Router>
    </ThemeProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
