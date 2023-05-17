var express = require('express');
var router = express.Router();
const apiAccount = require('../controllers/APIs/account.controller.api')
const apiBook = require('../controllers/APIs/book.controller.api')
const apiBill = require('../controllers/APIs/bill.controller.api')
//====== account=============
router.post('/login', apiAccount.login);
router.get('/account/:idAccount', apiAccount.getAccount);
router.put('/account/:idAccount', apiAccount.updateAccount);
//======= book============
router.get("/books", apiBook.getListBook)
router.get('/categorys', apiBook.getListCategory)
router.get('/books/search', apiBook.searchBook)
router.get('/book.:idBook', apiBook.viewBook);
//======== bill===============
router.get('/bills',apiBill.getListBill)
router.get('/bills/:idAccount',apiBill.getListBillByIdAccount)
router.get('/bill/:idBill',apiBill.getBillById)
router.post('/bill', apiBill.addBill)
router.put('/bill/:idBill', apiBill.updateBill)
router.get('/bills/search', apiBill.searchBillByPhone)
module.exports = router;