var db = require("./database");

const accountSchema = new db.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    passwd: {
      type: String,
      require: true,
    },
    fullname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: false,
    },
    avatar: {
      type: String,
      require: true,
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
    name: { type: String, require: true },
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
