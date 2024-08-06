var express = require("express");
var router = express.Router();

const listStudent = [
  {
    mssv: 1,
    hoten: "Trần Trọng Thân",
    lop: "MD18401",
    dtb: 9.2,
  },
  {
    mssv: 2,
    hoten: "Lê Văn Hùng",
    lop: "MD18401",
    dtb: 9.4,
  },
  {
    mssv: 3,
    hoten: "Phan Trọng Huy",
    lop: "MD18401",
    dtb: 6.5,
  },
  {
    mssv: 4,
    hoten: "Võ Việt Hưng",
    lop: "WD18401",
    dtb: 7,
  },
];

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: API để quản lý sinh viên
 */

/**
 * @swagger
 * /students/list:
 *   get:
 *     tags: [Student]
 *     summary: Lấy danh sách sinh viên
 *     responses:
 *       200:
 *         description: Trả về danh sách sinh viên
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   mssv:
 *                     type: integer
 *                   hoten:
 *                     type: string
 *                   lop:
 *                     type: string
 *                   dtb:
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
router.get("/list", function (req, res, next) {
  res.status(200).json(listStudent);
});

/**
 * @swagger
 * /students/add:
 *   post:
 *     tags: [Student]
 *     summary: Thêm sinh viên mới vào danh sách
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mssv:
 *                 type: integer
 *               hoten:
 *                 type: string
 *               lop:
 *                 type: string
 *               dtb:
 *                 type: number
 *     responses:
 *       200:
 *         description: Thêm sinh viên thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
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
router.post("/add", function (req, res, next) {
  const { mssv, hoten, lop, dtb } = req.body;
  const item = { mssv: mssv, hoten: hoten, lop: lop, dtb: dtb };
  listStudent.push(item);
  res.status(200).json(listStudent);
});

/**
 * @swagger
 * /students/delete/{mssv}:
 *   delete:
 *     tags: [Student]
 *     summary: Xóa sinh viên khỏi danh sách
 *     parameters:
 *       - in: path
 *         name: mssv
 *         schema:
 *           type: integer
 *         required: true
 *         description: MSSV của sinh viên cần xóa
 *     responses:
 *       200:
 *         description: Xóa sinh viên thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 listStudent:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Sinh viên không tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete("/delete/:mssv", function (req, res) {
  const { mssv } = req.params;
  const index = listStudent.findIndex((p) => p.mssv == mssv);
  if (index !== -1) {
    listStudent.splice(index, 1);
    res.status(200).json({ message: "Xóa sinh viên thành công", listStudent });
  } else {
    res.status(404).json({ message: "Sinh viên không tồn tại" });
  }
});

/**
 * @swagger
 * /students/update/{mssv}:
 *   put:
 *     tags: [Student]
 *     summary: Cập nhật thông tin sinh viên
 *     parameters:
 *       - in: path
 *         name: mssv
 *         schema:
 *           type: integer
 *         required: true
 *         description: MSSV của sinh viên cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hoten:
 *                 type: string
 *               lop:
 *                 type: string
 *               dtb:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cập nhật thông tin sinh viên thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mssv:
 *                   type: integer
 *                 hoten:
 *                   type: string
 *                 lop:
 *                   type: string
 *                 dtb:
 *                   type: number
 *       404:
 *         description: Sinh viên không tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put("/update/:mssv", function (req, res) {
  const { mssv } = req.params;
  const { hoten, lop, dtb } = req.body;
  const index = listStudent.findIndex((p) => p.mssv == mssv);
  if (index !== -1) {
    listStudent[index] = { mssv: parseInt(mssv), hoten, lop, dtb };
    res.status(200).json(listStudent[index]);
  } else {
    res.status(404).json({ message: "Sinh viên không tồn tại" });
  }
});

/**
 * @swagger
 * /students/detail/{mssv}:
 *   get:
 *     tags: [Student]
 *     summary: Lấy thông tin chi tiết của sinh viên theo MSSV
 *     parameters:
 *       - in: path
 *         name: mssv
 *         schema:
 *           type: integer
 *         required: true
 *         description: MSSV của sinh viên cần lấy thông tin
 *     responses:
 *       200:
 *         description: Lấy thông tin sinh viên thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 item:
 *                   type: object
 *                   properties:
 *                     mssv:
 *                       type: integer
 *                     hoten:
 *                       type: string
 *                     lop:
 *                       type: string
 *                     dtb:
 *                       type: number
 *       404:
 *         description: Sinh viên không tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/detail/:mssv", function (req, res) {
  const { mssv } = req.params;
  const item = listStudent.find((p) => p.mssv == mssv);
  if (item) {
    res.status(200).json({ message: "Lấy thông tin sv thành công", item });
  } else {
    res.status(404).json({ message: "Sinh viên không tồn tại" });
  }
});

/**
 * @swagger
 * /students/getList:
 *   get:
 *     tags: [Student]
 *     summary: Lấy danh sách sinh viên có điểm trung bình từ 6.5 đến 8.0
 *     responses:
 *       200:
 *         description: Trả về danh sách sinh viên
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   mssv:
 *                     type: integer
 *                   hoten:
 *                     type: string
 *                   lop:
 *                     type: string
 *                   dtb:
 *                     type: number
 */
// Lấy danh sách các sinh viên có điểm trung bình từ 6.5 đến 8.0
router.get("/students/getList", function (req, res) {
  const item = listStudent.filter((p) => p.dtb >= 6.5 && p.dtb <= 8.0);
  res.status(200).json(item);
});

// Lấy ra danh sách các sinh viên thuộc lớp MD18401 và có điểm trung bình lớn hơn 9
router.get("/students/getListMD18401", function (req, res) {
  const item = listStudent.filter((p) => p.lop === "MD18401" && p.dtb > 9);
  res.status(200).json(item);
});

// Sắp xếp danh sách sinh viên theo điểm trung bình
router.get("/students/sortList", function (req, res) {
  const item = [...listStudent].sort((a, b) => b.dtb - a.dtb);
  res.status(200).json(item);
});

// Tìm ra sinh viên có điểm trung bình cao nhất thuộc lớp MD18401
router.get("/students/highestScore", function (req, res) {
  const item = listStudent.filter((p) => p.lop === "MD18401");
  if (item.length === 0) {
    return res
      .status(404)
      .json({ message: "Không có sinh viên nào thuộc lớp MD18401" });
  }
  const highestStudentOfList = item.sort((a, b) => b.dtb - a.dtb)[0];
  res.status(200).json(highestStudentOfList);
});
module.exports = router;
