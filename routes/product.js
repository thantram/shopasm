var express = require("express");
var router = express.Router();
var upload = require("../config/upload");
var sendMail = require("../config/configMail");

const nodemailer = require("nodemailer");
// var list = [
//   { id: 1, name: "bánh", price: 5000 },
//   { id: 2, name: "kẹo", price: 7000 },
// ];

/* GET home page. */

/**
 * @swagger
 * /san-pham/list:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm
 *       400:
 *         description: Lỗi
 */
router.get("/list", async function (req, res, next) {
  var list = await products.find();
  res.status(200).json(list);
});

// Xem ds sản phẩm
//localhost:3000/san-pham/list
http: router.get("/list", function (req, res, next) {
  res.status(200).json(list);
});

// Thêm sản phẩm
// router.post("/add", function (req, res, next) {
//   const { id, name, price } = req.body;
//   var item = { id: id, name: name, price: price };
//   list.push(item);
//   res.status(200).json(list);
// });

// Lấy thông tin sản phẩm trong ds dựa theo id
//localhost:3000/san-pham/detail?id=2
// router.get("/detail", function (req, res, next) {
//   const { id } = req.query;
//   var item = list.find((p) => p.id == id);
//   res.json(item);
// });

// Cách 2: lấy thông tin sản phẩm trong ds dựa theo id
//localhost:3000/san-pham/detail2/abc/def
// router.get("/detail2/:id", function (req, res, next) {
//   const { id } = req.params;
//   var item = list.find((p) => p.id == id);
//   res.json(item);
// });

// Sửa thông tin sản phẩm
// router.post("/edit", function (req, res, next) {
//   const { id, name, price } = req.body;
//   var item = list.find((p) => p.id == id);
//   item.name = name;
//   item.price = price;
//   res.json(list);
// });

// Xóa sản phẩm
// router.delete("/delete/:id", function (req, res, next) {
//   const { id } = req.params;
//   var index = list.findIndex((p) => p.id == id);
//   const item = list.splice(index, 1);
//   res.json(list);
// });

// Upload single file
router.post("/upload", [upload.single("image")], async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) {
      return res.json({ status: 0, link: "" });
    } else {
      const url = `http://localhost:5000/images/${file.filename}`;
      return res.json({ status: 1, url: url });
    }
  } catch (error) {
    console.log("Upload image error: ", error);
    return res.json({ status: 0, link: "" });
  }
});

// Upload multiple file
router.post("/uploads", [upload.array("image", 12)], async (req, res, next) => {
  try {
    const { files } = req;
    if (!files) {
      return res.json({ status: 0, link: [] });
    } else {
      const url = [];
      for (const singleFile of files) {
        url.push(`http://localhost:5000/images/${singleFile.filename}`);
      }
      return res.json({ status: 1, url: url });
    }
  } catch (error) {
    console.log("Upload image error: ", error);
    return res.json({ status: 0, link: [] });
  }
});

// Gửi email
router.post("/send-mail", async function (req, res, next) {
  try {
    const { to, subject, content } = req.body;

    const mailOptions = {
      from: "toanne <hodactoan201@gmail.com>",
      to: to,
      subject: subject,
      html: content,
    };
    await sendMail.transporter.sendMail(mailOptions);
    res.json({ status: 1, message: "Gửi mail thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Gửi mail thất bại" });
  }
});

module.exports = router;
