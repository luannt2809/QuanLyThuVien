const db = require("./database")
const billSchema = new db.mongoose.Schema({
    bookId: [{ type: db.mongoose.Types.ObjectId, required: true, ref: "ModelBook" }],
    accountId: { type: db.mongoose.Types.ObjectId, required: true, ref: "ModelUser" },
    imageCCCD: [{ type: String, require: true }],
    dateRent: { type: String, required: true },
    datePay: { type: String, required: true },
    totalPrice: { type: Number, default: 0, required: true },
    phone: { type: String, required: true }, 
    fullname:{type:String , required:true}, 
    status:{type:Boolean, default:false}
}, { collection: "bills" })
const ModelBill = db.mongoose.model("ModelBill", billSchema)
module.exports = { ModelBill }