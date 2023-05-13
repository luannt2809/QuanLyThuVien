const bookModel = require("../../models/book.model")
exports.getListBook = async (req, res, next)=>{
    let dataReturn ={
        message:"Lấy dữ liệu thành công",
        status:200
    }
    let catId = req.query.catId
    try {
        if(catId==""){
            let listBook = await bookModel.ModelBook.find().populate("catId")
            dataReturn.data = listBook
        }else{
            let listBook = await bookModel.ModelBook.find({catId:catId}).populate("catId")
            dataReturn.data = listBook
        }
       
    } catch (error) {
        dataReturn.message=error
        dataReturn.status=500
    }
    return res.json(dataReturn)
}
exports.getListCategory =async (req, res, next)=>{
    let dataReturn ={
        message :"Lấy dữ liệu thành công",
        status:200
    }
    try {
        let categorys = await bookModel.ModelCategory.find()
        dataReturn.data = categorys
    } catch (error) {
        dataReturn.message= error
        dataReturn.status =500
    }
    return res.json(dataReturn)
}
exports.searchBook =async (req, res, next)=>{
    let dataReturn ={
        status:200,
        message:"Lấy dữ liệu thành công"
    }
    try {
        let listBook = await bookModel.ModelBook.find({name:{ $regex: req.query.name, $options: 'i' }}).populate("catId")
        dataReturn.data = listBook
    } catch (error) {
        dataReturn.message= error
        dataReturn.status=500
    }
    return res.json(dataReturn)
}
