const billModel = require("../../models/bill.model");
const fs = require("fs").promises;
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
  try {
    let newBill = new billModel.ModelBill(req.body);
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
  try {
    let billOld = await billModel.ModelBill.findOne({ _id: idBilll });
    let billUpdate = billOld;
    if (status != null) {
      billUpdate.status = req.body.status;
    } else {
      billUpdate.status = billOld.status;
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
