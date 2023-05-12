var db = require("./database");

const bookSchema = new db.mongoose.Schema(
  {
    name: { type: String, required: true },
    priceBook: { type: Number, required: true },
    priceRent: { type: Number, required: true },
    author: { type: String, required: true },
    nxb: { type: String, required: true },
    quantity: { type: Number, required: true },
    desc: { type: String, required: false },
    image: { type: String, required: true },
    cateId: { type: db.mongoose.Schema.Types.ObjectId, ref: "cateModel" },
  },
  {
    collection: "books",
  }
);

let bookModel = db.mongoose.model("bookModel", bookSchema);

const cateSchema = new db.mongoose.Schema(
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

let cateModel = db.mongoose.model("cateModel", cateSchema);

module.exports = { bookModel, cateModel };
