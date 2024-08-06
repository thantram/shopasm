const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: API để quản lý sinh viên
 */

/**
 * @swagger
 * /students:
 *   post:
 *     tags: [Student]
 *     summary: Thêm mới một sinh viên
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mssv:
 *                 type: string
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               major:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sinh viên đã được thêm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mssv:
 *                   type: string
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 major:
 *                   type: string
 *       400:
 *         description: Lỗi khi thêm sinh viên
 */
router.post('/', (req, res) => {
  // Xử lý thêm sinh viên
});

/**
 * @swagger
 * /students/{mssv}:
 *   put:
 *     tags: [Student]
 *     summary: Thay đổi thông tin sinh viên theo mssv
 *     parameters:
 *       - name: mssv
 *         in: path
 *         required: true
 *         description: Mã số sinh viên
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               major:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thông tin sinh viên thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mssv:
 *                   type: string
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 major:
 *                   type: string
 *       400:
 *         description: Lỗi khi cập nhật thông tin sinh viên
 *       404:
 *         description: Sinh viên không tồn tại
 */
router.put('/:mssv', (req, res) => {
  // Xử lý thay đổi thông tin sinh viên
});

// Các route khác tương tự

module.exports = router;
