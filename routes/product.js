var express = require("express");
var router = express.Router();
var upload = require("../config/upload");
var sendMail = require("../config/configMail");

// var list = [
//   { id: 1, name: "bánh", price: 5000 },
//   { id: 2, name: "kẹo", price: 7000 },
// ];

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API để quản lý sản phẩm
 */

/**
 * @swagger
 * /san-pham/list:
 *   get:
 *     tags: [Product]
 *     summary: Lấy danh sách sản phẩm
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *       400:
 *         description: Lỗi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get("/list", async function (req, res, next) {
  var list = await products.find();
  res.status(200).json(list);
});

/**
 * @swagger
 * /san-pham/upload:
 *   post:
 *     tags: [Product]
 *     summary: Tải lên một hình ảnh đơn
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Tải lên thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 url:
 *                   type: string
 *       400:
 *         description: Lỗi khi tải lên
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 link:
 *                   type: string
 */
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

/**
 * @swagger
 * /san-pham/uploads:
 *   post:
 *     tags: [Product]
 *     summary: Tải lên nhiều hình ảnh
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Tải lên thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 url:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Lỗi khi tải lên
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 link:
 *                   type: array
 *                   items:
 *                     type: string
 */
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

/**
 * @swagger
 * /san-pham/send-mail:
 *   post:
 *     tags: [Product]
 *     summary: Gửi email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *               subject:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gửi email thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Gửi mail thành công"
 *       400:
 *         description: Lỗi khi gửi email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Gửi mail thất bại"
 */
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
