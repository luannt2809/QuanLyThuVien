const db = require("./database");
const billSchema = new db.mongoose.Schema(
  {
    bookId: [
      {
        type: db.mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "bookModel",
      },
    ],
    accountId: {
      type: db.mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "accountModel",
    },
    imageCCCD: [{ type: String, required: true }],
    dateRent: { type: String, required: true },
    datePay: { type: String, required: true },
    totalPrice: { type: Number, default: 0, required: true },
    phone: { type: String, required: true },
    fullname: { type: String, required: true },
    status: { type: Number, required: true },
  },
  { collection: "bills" }
);
const ModelBill = db.mongoose.model("billModel", billSchema);
module.exports = { ModelBill };
