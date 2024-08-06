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

// Xem ds sinh viên
router.get("/list", function (req, res, next) {
  res.status(200).json(listStudent);
});

// Thêm sinh viên mới vào ds
router.post("/add", function (req, res, next) {
  const { mssv, hoten, lop, dtb } = req.body;
  const item = { mssv: mssv, hoten: hoten, lop: lop, dtb: dtb };
  listStudent.push(item);
  res.status(200).json(listStudent);
});

// Xóa sinh viên khỏi ds
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

// Thay đổi thông tin sv trong ds
// router.post('/edit', function (req, res) {
//     const { mssv, hoten, lop, dtb } = req.body;
//     const item = listStudent.find(p => p.mssv == mssv);
//     item.hoten = hoten;
//     item.lop = lop;
//     item.dtb = dtb;
//     res.json({ message: 'Sửa thông tin sinh viên thành công', listStudent });
// })

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

// Lấy thông tin chi tiết của 1 sv theo mssv
router.get("/detail/:mssv", function (req, res) {
  const { mssv } = req.params;
  const item = listStudent.find((p) => p.mssv == mssv);
  if (item) {
    res.status(200).json({ message: "Lấy thông tin sv thành công", item });
  } else {
    res.status(404).json({ message: "Sinh viên không tồn tại" });
  }
});

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
