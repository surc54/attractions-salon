const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const squareConnect = require('square-connect');
//const config = require('./../config/config');

//const accessToken = config.square.accessToken;
// const accessToken: process.env.SQUARE_ACCESS_TOKEN || require("./../config/config").square.accessToken; //For testing
const accessToken = process.env.SQUARE_ACCESS_TOKEN  //For testing

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Set Square Connect credentials and environment
const defaultClient = squareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = accessToken;

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com

defaultClient.basePath = 'https://connect.squareupsandbox.com'; //for testing
//defaultClient.basePath = 'https://connect.squareup.com'; //for production

router.post('/process-payment', async (req, res) => {
    const request_params = req.body;

    // length of idempotency_key should be less than 45
    const idempotency_key = crypto.randomBytes(22).toString('hex');

    // Charge the customer's card
    const payments_api = new squareConnect.PaymentsApi();
    const request_body = {
        source_id: request_params.nonce,
        amount_money: {
            amount: request_params.amount*100, // in cents. Return an integer value
            currency: 'USD'
        },
        idempotency_key: idempotency_key
    };

    try {
        const response = await payments_api.createPayment(request_body);
        res.status(200).json({
            'title': 'Payment Successful',
            'result': response
        });
    } catch (error) {
        res.status(500).json({
            'title': 'Payment Failure',
            'result': error.response.text
        });
    }
});

module.exports = router;