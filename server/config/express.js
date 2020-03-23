require("./config_setup")();
const path = require("path"),
    express = require("express"),
    mongoose = require("mongoose"),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    MongoStore = require("connect-mongo")(session),
    passport = require("passport"),
    exampleRouter = require("../routes/examples.server.routes"),
    servicesRouter = require("../routes/services.routes"),
    accountRouter = require("../routes/account.routes"),
    adminRouter = require("../routes/admin/index.routes"),
    config = require("./config");

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || require("./config").db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.set("useCreateIndex", true);
    mongoose.set("useFindAndModify", false);

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan("dev"));

    app.use(
        session({
            secret: config.cookie.secret,
            cookie: {
                maxAge: 86400000,
            },
            saveUninitialized: false,
            resave: false,
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
            }),
        })
    );

    // body parsing middleware
    app.use(bodyParser.json());

    require("./passport_setup")();
    app.use(passport.initialize());
    app.use(passport.session());

    // add a router
    app.use("/api/example", exampleRouter);
    app.use("/api/services", servicesRouter);
    app.use("/api/account", accountRouter);
    app.use("/api/admin", adminRouter);

    if (process.env.NODE_ENV === "production") {
        // Serve any static files
        app.use(express.static(path.join(__dirname, "../../client/build")));

        // Handle React routing, return all requests to React app
        app.get("*", function(req, res) {
            res.sendFile(
                path.join(__dirname, "../../client/build", "index.html")
            );
        });
    }

    return app;
};
