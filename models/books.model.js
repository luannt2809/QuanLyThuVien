var db = require("./database");

const bookSchema = new db.Schema(
  {
    name: { type: String, required: true },
    priceBook: { type: Number, required: true },
    priceRent: { type: Number, required: true },
    desc: { type: String, required: false },
    image: { type: String, required: true },
    cateId: { type: db.Schema.Types.ObjectId, ref: "cateModel" },
  },
  {
    collection: "books",
  }
);

let bookModel = db.model("bookModel", bookSchema);

const cateSchema = new db.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    collection: "categories",
  }
);

let cateModel = db.model("cateModel", cateSchema);

module.exports = { bookModel, cateModel };
