import "normalize.css/normalize.css";
import "./components/global.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import history from "./models/history";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

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

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

const enhancer = composeEnhancers(applyMiddleware(reduxThunk));

const store = createStore(reducers, enhancer);

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                max={3}
                hideIconVariant
                classes={{ root: "mat-ui-snackbar-root" }}
            >
                <Router history={history}>
                    <App />
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
