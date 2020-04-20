var helper = require("sendgrid").mail;
const async = require("async");

function sendEmail(
    parentCallback,
    fromEmail,
    toEmails,
    subject,
    textContent,
    htmlContent
) {
    const errorEmails = [];
    const successfulEmails = [];
    const sg = require("sendgrid")(
        "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"
    );
    async.parallel(
        [
            function (callback) {
                for (let i = 0; i < toEmails.length; i += 1) {
                    const senderEmail = new helper.Email(fromEmail);
                    const toEmail = new helper.Email(toEmails[i]);
                    const content = new helper.Content(
                        "text/html",
                        htmlContent
                    );
                    const mail = new helper.Mail(
                        senderEmail,
                        subject,
                        toEmail,
                        content
                    );
                    var request = sg.emptyRequest({
                        method: "POST",
                        path: "/v3/mail/send",
                        body: mail.toJSON(),
                    });
                    sg.API(request, function (error, response) {
                        if (error) {
                            console.log("Error response received");
                        }
                    });
                }

                callback(null, true);
            },
        ],
        function (err) {
            console.log(err);
        }
    );
    parentCallback(null, {
        successfulEmails: successfulEmails,
        errorEmails: errorEmails,
    });
}

module.exports = (app) => {
    app.post("/api/send", function (req, res, next) {
        async.parallel(
            [
                function (callback) {
                    sendEmail(
                        callback,
                        "YOUR_FROM_EMAIL@example.com",
                        [
                            "YOUR_TO_EMAIL1@example.com",
                            "YOUR_TO_EMAIL2@example.com",
                        ],
                        "Subject Line",
                        "Text Content",
                        '<p style="font-size: 32px;">HTML Content</p>'
                    );
                },
            ],
            function (err, results) {
                res.send({
                    success: true,
                    message: "Emails sent",
                    successfulEmails: results[0].successfulEmails,
                    errorEmails: results[0].errorEmails,
                });
            }
        );
    });
};
