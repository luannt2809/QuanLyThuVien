const db = require("./database");
const bookSchema = new db.mongoose.Schema(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    cateId: {
      type: db.mongoose.Types.ObjectId,
      required: true,
      ref: "ModelCategory",
    },
    priceBook: { type: Number, required: true, default: 0 },
    priceRent: { type: Number, required: true, default: 0 },
    nxb: { type: String, required: true },
    image: { type: String },
    desc: { type: String },
    quantity: { type: Number, required: true, default:0 },
  },
  {
    collection: "books",
  }
);
const categorySchema = new db.mongoose.Schema(
  {
    name: { type: String, required: true },
    image: {
      type: String,
      required: true,
    }
  },
  {
    collection: "categories",
  }
);
const ModelBook = db.mongoose.model("ModelBook", bookSchema);
const ModelCategory = db.mongoose.model("ModelCategory", categorySchema);
module.exports = { ModelBook, ModelCategory };
