const fs = require("fs");
const path = require("path");
require("colors");

const PREFIX = "[CONFIG SETUP]".bgWhite.black + " ";

const checks = [
    {
        fileName: path.resolve(__dirname, "config.js"),
        message: {
            not_found: "Could not find " + "config.js".yellow + ".",
        },
        exit: true,
        special: [
            {
                condition: obj => {
                    if (!obj.cookie || !obj.cookie.secret) {
                        return true;
                    }
                    return false;
                },
                run: () => {
                    console.log(PREFIX + "Cookie secret missing.");
                    console.log(
                        PREFIX +
                            'Add {cookie: {secret: "<random characters>"}} to your config.'
                    );
                    console.log(
                        PREFIX + "Note: Please actually put random characters"
                    );
                    process.exit(1);
                },
            },
            {
                condition: obj => {
                    return !obj.db || !obj.db.uri;
                },
                run: () => {
                    console.log(PREFIX + "Database URI missing.");
                    console.log(
                        PREFIX +
                            'Add {db: {uri: "<mongodb_uri>"}} to your config.'
                    );
                    process.exit(1);
                },
            },
        ],
    },
];

module.exports = () => {
    checks.forEach(c => {
        const filePath = path.resolve(c.fileName);

        if (!fs.existsSync(filePath)) {
            c.message.not_found
                .split(/\r\n|\n/)
                .forEach(s => console.log(PREFIX + s));
            if (c.exit === true) {
                console.log(PREFIX + "Stopping due to missing file...");
                process.exit(1);
            }
        } else {
            if (c.special) {
                const obj = require(c.fileName);
                c.special.forEach(s => {
                    if (s.condition(obj)) {
                        s.run();
                    }
                });
            }
        }
    });
};
