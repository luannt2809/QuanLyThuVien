const db = require("./database");
const bookSchema = new db.mongoose.Schema(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    catId: {
      type: db.mongoose.Types.ObjectId,
      required: true,
      ref: "ModelCategory",
    },
    priceBook: { type: Number, required: true, default: 0 },
    priceRent: { type: Number, required: true, default: 0 },
    nxb: { type: String, required: true },
    image: { type: String },
    desc: { type: String },
    quantity: { type: Number, required: true },
  },
  {
    collection: "books",
  }
);
const categorySchema = new db.mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    collection: "cattegorys",
  }
);
const ModelBook = db.mongoose.model("ModelBook", bookSchema);
const ModelCategory = db.mongoose.model("ModelCategory", categorySchema);
module.exports = { ModelBook, ModelCategory };
