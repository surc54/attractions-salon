const {
  send_code_error,
  send_code_success,
  requiredBody,
} = require("../tools");
const EzSetting = require("../models/ez-setting.model");

const KEY_REGEX = /^[A-Za-z\-_]+$/;

module.exports.get = (req, res) => {
  const { key } = req.query;

  // make sure key exists
  if (!key) {
      send_code_error(res, 400, "ez-settings/get/missing-key");
      return;
  }

  // make sure key is valid
  if (!KEY_REGEX.test(key)) {
      send_code_error(res, 400, "ez-settings/get/bad-key");
      return;
  }

  // key is okay. check with database.
  EzSetting.findOne({ key })
      .then((resp) => {
          // check if valid document.
          if (!resp || !resp._id) {
              send_code_error(res, 404, "ez-settings/get/not-found");
              return;
          }

          // send document
          send_code_success(res, 200, "ez-settings/get/success", {
              data: resp.toObject({ versionKey: false }),
          });
      })
      .catch((err) => {
          // something went wrong.
          send_code_error(res, 500, "ez-settings/get/error", { error: err });
      });
};

module.exports.set = [
  requiredBody(["key", "value"], undefined, "ez-settings/set/missing-%s"),
  (req, res) => {
      let { key, value } = req.body;

      // no need to check if key/value actually exists, as requiredBody should've taken care of that

      // make sure key is valid
      if (!KEY_REGEX.test(key)) {
          send_code_error(res, 400, "ez-settings/set/bad-key");
          return;
      }

      // force value to string
      if (typeof value !== "string") {
          if (value.toString) {
              value = value.toString();
          } else {
              value = String(value);
          }
      }

      EzSetting.updateOne(
          {
              key,
          },
          { key, value },
          { upsert: true }
      )
          .then((resp) => {
              send_code_success(res, 200, "ez-settings/set/success", {
                  data: { key, value },
              });
          })
          .catch((err) => {
              send_code_error(res, 500, "ez-settings/set/error", {
                  error: err,
              });
          });
  },
];
