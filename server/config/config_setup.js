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
        }
    });
};
