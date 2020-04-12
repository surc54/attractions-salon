//This file holds any configuration variables we may need
//'config.js' is usually ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
    cookie: {
        secret: "fdhgds",
    },
    db: {
        uri: "mongodb+srv://kaseyk:kaseyk@cluster0-uylka.mongodb.net/test?retryWrites=true&w=majority",
    },
    recaptcha: {
        v2: {
            siteKey: "6Le9zuMUAAAAAE6pAtVkhrOoRrMaycB9b-hdA53b",
            secretKey: "6Le9zuMUAAAAAAWpILnFO31twaziv7SOZ-4rVjio",
        },
    },
    options: {
        admin: {
            accountsPerPage: 10,
        },
        delayResponse: false,
    },
};