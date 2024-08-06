var express = require("express");
var router = express.Router();
const JWT = require("jsonwebtoken");
const config = require("../config");
var cateModel = require("../models/category");
const checkToken = require("./checkToken");

//localhost:3000/danh-muc/add
router.post("/add", checkToken, async function (req, res, next) {
  const { name } = req.body;

  const newItem = { name };

  await cateModel.create(newItem);

  res.json(newItem);
});

/* GET home page. */
//http://localhost:5000/danh-muc/list
router.get("/list", checkToken, async function (req, res, next) {
  try {
    var list = await cateModel.find({}, "name");
    res.status(200).json(list);
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

router.post("/edit", async function (req, res, next) {
  try {
    const { id, name } = req.body;

    const itemEdit = await cateModel.findById(id);

    if (itemEdit) {
      itemEdit.name = name ? name : itemEdit.name;

      await itemEdit.save();

      res.status(200).json({ status: true, message: "Thành công" });
    } else {
      res.status(400).json({ status: false, message: "Thất bại" });
    }
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

//localhost:3000/danh-muc/delete?id=abc&name=cde&price=5000 : query
//localhost:3000/danh-muc/delete/abc : params
//  /delete/:id/:name/:price ==> params
router.delete("/delete/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    await cateModel.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: "Thành công" });
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

module.exports = router;
