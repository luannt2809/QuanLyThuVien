var express = require('express');
var router = express.Router();
const apiAccount = require('../controllers/APIs/account.controller.api')
const apiBook = require('../controllers/APIs/book.controller.api')
const apiBill = require('../controllers/APIs/bill.controller.api')
const statiscal = require('../controllers/APIs/statistical.controller.api')
//====== account=============
router.post('/login', apiAccount.login);
router.get('/account/:idAccount', apiAccount.getAccount);
router.put('/account/:idAccount', apiAccount.updateAccount);
router.post('/confiPass', apiAccount.confiPass);
//======= book============
router.get("/books", apiBook.getListBook)
router.get('/categorys', apiBook.getListCategory)
router.get('/books/search', apiBook.searchBook)
router.get('/book/:idBook', apiBook.viewBook);
router.get('/categorys/search', apiBook.categorySearch)
//======== bill===============
router.get('/bills',apiBill.getListBill)
router.get('/bills/:idAccount',apiBill.getListBillByIdAccount)
router.get('/bill/:idBill',apiBill.getBillById)
router.post('/bill', apiBill.addBill)
router.put('/bill/:idBill', apiBill.updateBill)
router.get('/bill', apiBill.searchBillByPhone)
//==============statiscal=====================
router.get('/statiscalAll', statiscal.statilcalAll)
router.get('/statiscalByStatus',statiscal.statilcalBillByStatus)
router.get('/statiscalByDateRent',statiscal.statilcalBillByDateRent)
router.get('/statiscalByDatePay',statiscal.statilcalBillByDatePay)
module.exports = router;