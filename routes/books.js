var express = require("express");
var router = express.Router();
var bookController = require("../controllers/book.controllers");
var multer = require("multer");
var uploader = multer({ dest: "./tmp" });

router.get("/", bookController.list);

router.get("/add", bookController.add);
router.post("/add", uploader.single("image"), bookController.postBook);

router.get("/view/:id", bookController.view);

router.get("/edit/:id", bookController.edit);
router.post("/edit/:id", uploader.single("image"), bookController.putBook);

router.get("/delete/:id", bookController.delete);
router.post("/delete/:id", bookController.deleteBook);

router.get("/search/", bookController.searchBook);

module.exports = router;
