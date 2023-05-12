var express = require('express');
var router = express.Router();
const apiController = require('../controllers/APIs/account.controller.api')
router.post('/login', apiController.login);
router.get('/getAccount/:idAccount', apiController.getAccount);
router.put('/updateAccount/:idAccount', apiController.updateAccount);
module.exports = router;