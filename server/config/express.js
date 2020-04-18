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
    stylistRouter = require("../routes/stylists.routes"),
    photosRouter = require("../routes/photos.routes"),
    accountRouter = require("../routes/account.routes"),
    adminRouter = require("../routes/admin/index.routes");

const { send_code_error } = require("../tools/index");

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
            secret:
                process.env.COOKIE_SECRET || require("./config").cookie.secret,
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

    if (process.env.DELAY_BACKEND) {
        app.use((req, res, next) => setTimeout(next, 1000));
    }

    // add a router
    app.use("/api/example", exampleRouter);
    app.use("/api/services", servicesRouter);
    app.use("/api/account", accountRouter);
    app.use("/api/admin", adminRouter);
    app.use("/api/photos", photosRouter);
    app.use("/api/stylists", stylistRouter);

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

    // Auth Error Handling
    app.use((err, req, res, next) => {
        if (err && err.name && err.name === "AuthenticationError") {
            send_code_error(res, 401, "auth/sign-in/failure");
        } else next(err);
    });

    return app;
};
