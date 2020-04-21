const _ = require("lodash");
const data = require("./services.json");

const size = _.size(data);

const uniq = _.uniqBy(data, "imgURL");
const uniqSize = _.size(uniq);

console.log(`Original = ${size}; Uniq = ${uniqSize}`);

console.log(_.difference(data, uniq));
