var db = require("./database");

const accountSchema = new db.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    passwd: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: true,
    },
    roleId: { type: db.Schema.Types.ObjectId, ref: "roleModel" },
  },
  {
    collection: "accounts",
  }
);

let accountModel = db.model("accountModel", accountSchema);

const roleSchema = new db.Schema(
  {
    name: { type: String, required: true },
  },
  {
    collection: "roles",
  }
);

let roleModel = db.model("roleModel", roleSchema);

module.exports = {
  accountModel,
  roleModel,
};
