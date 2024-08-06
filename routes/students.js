const express = require('express');
const router = express.Router();

// Định nghĩa các route cho sinh viên ở đây

// Thêm mới một sinh viên
router.post('/', (req, res) => {
  // Xử lý thêm sinh viên
});

// Thay đổi thông tin sinh viên theo mssv
router.put('/:mssv', (req, res) => {
  // Xử lý thay đổi thông tin sinh viên
});

// Các route khác tương tự

module.exports = router;
