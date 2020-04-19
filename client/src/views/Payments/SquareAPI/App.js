import React, { Component } from "react";
import PaymentForm from "./PaymentForm";
import CircularProgress from "@material-ui/core/CircularProgress";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
    }

    UNSAFE_componentWillMount() {
        const that = this;
        let sqPaymentScript = document.createElement("script");
        //sqPaymentScript.src = "https://js.squareup.com/v2/paymentform";
        sqPaymentScript.src = "https://js.squareupsandbox.com/v2/paymentform"; //For testing
        sqPaymentScript.type = "text/javascript";
        sqPaymentScript.async = false;
        sqPaymentScript.onload = () => {
            that.setState({
                loaded: true,
            });
        };
        document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
    }

    render() {
        return !this.state.loaded ? (
            <>
                <CircularProgress />
            </>
        ) : (
            <PaymentForm
                paymentForm={window.SqPaymentForm}
                appointment={this.props.appointment}
            />
        );
    }
}

export default App;
