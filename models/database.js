var mongoose = require('mongoose')

mongoose.connect("mongodb+srv://luanntph26376:luan2809@cluster0.tr5kh33.mongodb.net/ql_thuvien").catch(err => console.error(err))

module.exports ={mongoose}