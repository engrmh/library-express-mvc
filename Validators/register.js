const validator = require("fastest-validator");

const v = new validator();

const schema = {
  name: { type: "string", min: 3, max: 40 },
  username: { type: "string", min: 4, max: 30 },
  email: { type: "string" },
  password: { type: "string", min: 8, max: 20 },
  $$strict: true,
};

module.exports = v.compile(schema);
