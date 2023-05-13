const billModel = require('../../models/bill.model')
const fs = require("fs").promises
exports.getListBill = async (req, res, next) => {
    let dataReturn = {
        message: "Lấy dữ liệu thành công",
        status: 200
    }
    let status = req.query.status
    
    try {
        if(status!=null||status!=""){
            let listBill = await billModel.ModelBill.find({status:status}).populate("bookId")
            dataReturn.data = listBill
        }else{
            let listBill = await billModel.ModelBill.find().populate("bookId")
            dataReturn.data = listBill
        }
    } catch (error) {
        dataReturn.message = error
        dataReturn.status = 500
    }
    return res.json(dataReturn)
}
exports.getListBillByIdAccount = async (req, res, next) => {
    let dataReturn = {
        message: "Lấy dữ liệu thành công",
        status: 200
    }
    let idAccount = req.params.idAccount
    let status = req.query.status
    try {
        if(status!=""||status!=null){
            let listBill = await billModel.ModelBill.find({accountId:idAccount, status:status}).populate("bookId")
            dataReturn.data = listBill
        }else{
            let listBill = await billModel.ModelBill.find({accountId:idAccount}).populate("bookId")
            dataReturn.data = listBill
        }
       
    } catch (error) {
        dataReturn.message = error
        dataReturn.status = 500
    }
    return res.json(dataReturn)
}
exports.getBillById = async (req, res, next)=>{
    let dataReturn = {
        message: "Lấy dữ liệu thành công",
        status: 200
    }
    let idBill = req.params.idBill
    try {
        let listBill = await billModel.ModelBill.findOne({_id:idBill}).populate("bookId")
        dataReturn.data = listBill
    } catch (error) {
        dataReturn.message = error
        dataReturn.status = 500
    }
    return res.json(dataReturn)
}
exports.addBill = async (req, res, next) => {
    let dataReturn = {
        message: "Tạo phiếu mượn thành công",
        status: 201
    }
    try {
        let newBill = new billModel.ModelBill(req.body)
        await newBill.save()
    } catch (error) {
        dataReturn.message = error
        dataReturn.status = 500
    }
    return res.json(dataReturn)
}
exports.updateBill = async (req, res, next) => {
    let dataReturn = {
        message: "Cập nhật thành công",
        status: 200
    }
    let idBilll = req.params.idBill
    try {
        let billOld = await billModel.ModelBill.findOne({ _id: idBilll }).populate("bookId")
        let billUpdate = billOld;
        if (req.body.status != null) {
            billUpdate.status = req.body.status
        } else {
            billUpdate.status = billOld.status
        }
        await billModel.ModelBill.updateOne({ _id: idBilll }, billUpdate)
    } catch (error) {
        dataReturn.message = error
        dataReturn.status = 500
    }
    return res.json(dataReturn)
}
exports.searchBillByPhone = async (req, res, next)=>{
    let dataReturn ={
        message:"Lấy dữ liệu thành công",
        status:200
    }
    let status = req.query.status
    try {
        if(status==""){
            let listBill = await billModel.ModelBill.find({phone:req.query.phone})
            dataReturn.data = listBill
        }else{
            let listBill = await billModel.ModelBill.find({phone:req.query.phone, status:status})
            dataReturn.data = listBill
        }

    } catch (error) {
        dataReturn.message=error
        dataReturn.status=500
    }
    return res.json(dataReturn)
}
