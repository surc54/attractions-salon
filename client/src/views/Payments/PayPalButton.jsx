import React from "react";
import { Button } from "@material-ui/core";
import "./Payments.css";

const PayPalButton = props => {
    return (
        <div>
            {/* <div id="paypal-button-container"></div> */}
            <script src="https://www.paypal.com/sdk/js?client-id=sb&currency=USD"></script>

                <Button variant = "outlined" color = "primary" className = "paypalButton">PayPal</Button>
                 


            {/* // paypal.Buttons({
                //     style: {
                //         shape: 'rect',
                //         color: 'gold',
                //         layout: 'vertical',
                //         label: 'paypal',

                //     },
                //     createOrder: function (data, actions) {
                //         return actions.order.create({
                //             purchase_units: [{
                //                 amount: {
                //                     value: '1'
                //                 }
                //             }]
                //         });
                //     },
                //     onApprove: function (data, actions) {
                //         return actions.order.capture().then(function (details) {
                //             alert('Transaction completed by ' + details.payer.name.given_name + '!');
                //         });
                //     }
                // }).render('#paypal-button-container') */}

        </div>
    );
};

export default PayPalButton;




