var accountModel = require("../../models/accounts.model");
var billModel = require("../../models/bill.model");
var bookModel = require("../../models/books.model");
const moment = require("moment");
exports.statilcalAll = async (req, res, next) => {
    let dataReturn = {
        message: "Lấy dữ liệu thành công",
        status: 200
    }
    try {
        let countAccount = await accountModel.accountModel.countDocuments({ roleId: '645baaef738c215da807bae6' });
        let countBook = await bookModel.bookModel.countDocuments();
        let countBill = await billModel.ModelBill.countDocuments();
        let bills = await billModel.ModelBill.find()
            .populate("accountId")
            .populate("bookId.idBook");
        dataReturn.data = {
            countAccount: countAccount,
            countAccount: countBook,
            countBill: countBill,
            bills: bills

        }
    } catch (err) {
        console.log("Lỗi: " + err);
        dataReturn.message = err.message
        dataReturn.status = 500
    }

    return res.json(dataReturn)
}
exports.statilcalBillByStatus = async (req, res, next) => {
    let dataReturn = {
        message: "Lấy dữ liệu thành công",
        status: 200
    }
    let statusBill = req.query.status || ""
    try {
        let countBill = {}
        if (statusBill != "") {
            countBill = await billModel.ModelBill.countDocuments({ status: statusBill });
        } else {
            countBill = await billModel.ModelBill.countDocuments();
        }
        let bills = {}
        if (statusBill != "") {
            bills = await billModel.ModelBill.find({ status: statusBill })
                .populate("accountId")
                .populate("bookId.idBook");
        } else {
            bills = await billModel.ModelBill.find()
                .populate("accountId")
                .populate("bookId.idBook");
        }
        let totalBill = 0;
        bills.map((item) => {
            totalBill += item.totalPrice;
        })
        dataReturn.data = {
            countBillStatus: countBill,
            billStatus: bills,
            totalBill: totalBill

        }
    } catch (error) {
        dataReturn.message = error
        dataReturn.status = 500
    }
    return res.json(dataReturn)
}
exports.statilcalBillByDateRent = async (req, res, next) => {
    let dataReturn = {
        message: "Lấy dữ liệu thành công",
        status: 200
    }
    const dateRent = req.query.dateRent || ""
    let status = req.query.status || -1
    try {

        let query = {}
        if (dateRent != "") {
            // const Rent =moment(dateRent).format("YYYY/MM/DD");
            query.dateRent = dateRent
        }
        if (status != -1) {
            query.status = status;
        }
        let bills = await billModel.ModelBill.find(query)
            .populate("accountId")
            .populate("bookId.idBook");
        console.log("step4");
        let countBill = await billModel.ModelBill.countDocuments(query);
        let totalBill = 0;
        bills.map((item) => {
            totalBill += item.totalPrice;
        })
        dataReturn.data = {
            countBillStatus: countBill,
            billStatus: bills,
            totalBill: totalBill

        }
    } catch (error) {
        dataReturn.message = error
        dataReturn.status = 500
    }
    return res.json(dataReturn)
}
exports.statilcalBillByDatePay = async (req, res, next) => {
    let dataReturn = {
        message: "Lấy dữ liệu thành công",
        status: 200
    }
    const datePay = req.query.datePay || ""
    let status = req.query.status || -1
    try {
        let query = {}
        if (datePay != "") {
            query.datePay = datePay

        }
        if (status != -1) {
            query.status = status;
        }
        console.log(query);
        let bills = await billModel.ModelBill.find(query)
            .populate("accountId")
            .populate("bookId.idBook");
        let countBill = await billModel.ModelBill.countDocuments(query);
        let totalBill = 0;
        bills.map((item) => {
            totalBill += item.totalPrice;
        })
        dataReturn.data = {
            countBillStatus: countBill,
            billStatus: bills,
            totalBill: totalBill

        }
    } catch (error) {
        dataReturn.message = error
        dataReturn.status = 500
    }
    return res.json(dataReturn)
}