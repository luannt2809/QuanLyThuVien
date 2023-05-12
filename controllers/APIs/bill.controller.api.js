const billModel = require('../../models/bill.model')
const fs = require("fs").promises
exports.getListBill = async (req, res, next)