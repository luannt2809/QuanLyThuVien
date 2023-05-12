const db = require('./database')
const userSchema = new db.mongoose.Schema({
    username:{type:String, required:true},
    passwd:{type:String, required:true},
    fullname:{type:String, required:true},
    role:{type:db.mongoose.Types.ObjectId, required:true, ref:"ModelRole"},
    image:{type:String}
},{
    collection:"accounts"
})
const roleSchema = new db.mongoose.Schema({
    name:{type:String, required:true}
})
const ModelUser = db.mongoose.model("ModelUser", userSchema)
const ModelRole = db.mongoose.model("ModelRole",roleSchema)
module.exports={ ModelUser, ModelRole}
