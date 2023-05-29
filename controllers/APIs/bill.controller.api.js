const billModel = require("../../models/bill.model");
const fs = require("fs").promises;
const moment = require("moment");
exports.getListBill = async (req, res, next) => {
  let dataReturn = {
    message: "Lấy dữ liệu thành công",
    status: 200,
  };
  let status = req.query.status || null;

  try {
    if (status != null) {
      let listBill = await billModel.ModelBill.find({ status: status })
        .populate("accountId")
        .populate("bookId.idBook");
      dataReturn.data = listBill;
    } else {
      let listBill = await billModel.ModelBill.find()
        .populate("accountId")
        .populate("bookId.idBook");
      dataReturn.data = listBill;
    }
  } catch (error) {
    dataReturn.message = error;
    dataReturn.status = 500;
  }
  return res.json(dataReturn);
};
exports.getListBillByIdAccount = async (req, res, next) => {
  let dataReturn = {
    message: "Lấy dữ liệu thành công",
    status: 200,
  };
  let idAccount = req.params.idAccount || "";
  let status = req.query.status || null;
  try {
    if (status != null) {
      let listBill = await billModel.ModelBill.find({
        accountId: idAccount,
        status: status,
      })
        .populate("accountId")
        .populate("bookId.idBook");
      dataReturn.data = listBill;
    } else {
      let listBill = await billModel.ModelBill.find({ accountId: idAccount })
        .populate("accountId")
        .populate("bookId.idBook");
      dataReturn.data = listBill;
    }
  } catch (error) {
    dataReturn.message = error;
    dataReturn.status = 500;
  }
  return res.json(dataReturn);
};
exports.getBillById = async (req, res, next) => {
  let dataReturn = {
    message: "Lấy dữ liệu thành công",
    status: 200,
  };
  let idBill = req.params.idBill;
  try {
    let listBill = await billModel.ModelBill.findOne({ _id: idBill })
      .populate("accountId")
      .populate("bookId.idBook");
    dataReturn.data = listBill;
  } catch (error) {
    dataReturn.message = error;
    dataReturn.status = 500;
  }
  return res.json(dataReturn);
};
exports.addBill = async (req, res, next) => {
  let dataReturn = {
    message: "Tạo phiếu mượn thành công",
    status: 201,
  };
  let bill = req.body;
  let bookId = bill.bookId||[]
  let accountId = bill.accountId||""
  let imageCCCD = bill.imageCCCD||[]
  let dateRent = bill.dateRent||""
  let datePay = bill.datePay||""
  let totalPrice = bill.totalPrice||0
  let phone= bill.phone||""
  let fullname = bill.fullname||""
  let status = bill.status|| 0
  console.log(bill);
  
  try {
    let newBill = new billModel.ModelBill({
      bookId: bookId,
      accountId: accountId,
      imageCCCD:imageCCCD,
      dateRent: dateRent,
      datePay: datePay,
      totalPrice: totalPrice,
      phone: phone,
      fullname: fullname,
      status: status
    });
    await newBill.save();
  } catch (error) {
    dataReturn.message = error;
    dataReturn.status = 500;
  }
  return res.json(dataReturn);
};
exports.updateBill = async (req, res, next) => {
  let dataReturn = {
    message: "Cập nhật thành công",
    status: 200,
  };
  let status = req.body.status || null;
  let idBilll = req.params.idBill;
  let datePay = req.body.datePay || ""

  console.log(formattedDate);
  try {
    let billOld = await billModel.ModelBill.findOne({ _id: idBilll });
    let billUpdate = billOld;
    if (status != null) {
      billUpdate.status = req.body.status;
    } else {
      billUpdate.status = billOld.status;
    }
    if (datePay != "") {
      billUpdate.datePay = datePay
    } else {
      const curretDate = new Date();
      const formattedDate = curretDate.toISOString().slice(0, 10);
      const datefomat = moment(formattedDate).format("DD/MM/YYYY");
      billUpdate.datePay = datefomat
    }
    await billModel.ModelBill.updateOne({ _id: idBilll }, billUpdate);
  } catch (error) {
    dataReturn.message = error;
    dataReturn.status = 500;
  }
  return res.json(dataReturn);
};
exports.searchBillByPhone = async (req, res, next) => {
  let dataReturn = {
    message: "Lấy dữ liệu thành công",
    status: 200,
  };
  let status = req.query.status || null;
  try {
    if (status == null) {
      let listBill = await billModel.ModelBill.find({ phone: req.query.phone })
        .populate("accountId")
        .populate("bookId.idBook");
      dataReturn.data = listBill;
    } else {
      let listBill = await billModel.ModelBill.find({
        phone: req.query.phone,
        status: status,
      })
        .populate("accountId")
        .populate("bookId.idBook");
      dataReturn.data = listBill;
    }
  } catch (error) {
    dataReturn.message = error;
    dataReturn.status = 500;
  }
  return res.json(dataReturn);
};
