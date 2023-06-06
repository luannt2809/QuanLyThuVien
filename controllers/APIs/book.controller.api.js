const bookModel = require("../../models/book.model")
exports.getListBook = async (req, res, next)=>{
    let dataReturn ={
        message:"Lấy dữ liệu thành công",
        status:200
    }
    let catId = req.query.cateId||""
    console.log("query: "+catId);
    try {
        if(catId==""){
            let listBook = await bookModel.ModelBook.find().populate("cateId")
            dataReturn.data = listBook
        }else{
            let listBook = await bookModel.ModelBook.find({cateId:catId}).populate("cateId")
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
        let listBook = await bookModel.ModelBook.find({name:{ $regex: req.query.name, $options: 'i' }}).populate("cateId")
        dataReturn.data = listBook
    } catch (error) {
        dataReturn.message= error
        dataReturn.status=500
    }
    return res.json(dataReturn)
}
exports.viewBook = async(req, res, next)=>{
    let dataReturn ={
        status:200,
        message:"Lấy dữ liệu thành công"
    }
    let idBook = req.params.idBook;
    try {
        let bookDetail = await bookModel.ModelBook.findOne({_id:idBook}).populate("cateId")
        dataReturn.data = bookDetail
        
    } catch (error) {
        dataReturn.message= error
        dataReturn.status=500
    }
    return res.json(dataReturn)
}
exports.editBook = async (req, res, next)=>{
    let dataReturn ={
        status:200,
        message:"Cập nhật thành công"
    }
    let idBook = req.params.idBook;
    let quantity = req.body.quantity||null;
    let nameBook = req.body.name||""
    try {
        let bookDetail = await bookModel.ModelBook.findOne({_id:idBook}).populate("cateId")
        let BookUpdate = bookDetail
        if(nameBook!=""){
            BookUpdate.name=nameBook;
        }else{
            BookUpdate.name= bookDetail.name
        }
        if(quantity!=null){
            BookUpdate.quantity = quantity;
        }
        await bookModel.ModelBook.updateOne({_id:idBook}, BookUpdate);
    } catch (error) {
        dataReturn.message= error
        dataReturn.status=500
    }
    return res.json(dataReturn)
}
exports.categorySearch= async(req, res, next)=>{
    let dataReturn={
        message:"", status:200
    }
    let name = req.query.name||""
    try {
        if(name){
            let categories = await bookModel.ModelCategory.find({name: { $regex: name, $options: 'i' }})
            dataReturn.message="Lấy dữ liệu thành công"
            dataReturn.data = categories;
        }else{
            let categories = await bookModel.ModelCategory.find();
            dataReturn.message="Lấy dữ liệu thành công"
            dataReturn.data = categories;
        }
       
    } catch (error) {
        dataReturn.message=error
        dataReturn.status=500
    }
    return res.json(dataReturn)
}
