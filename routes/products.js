const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

let list = [
  { 'id': 1, 'name': 'banh', 'price': 5000 }
];

let users = [];

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API để quản lý sản phẩm
 */

/**
 * @swagger
 * /products/list:
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
 *                     type: integer
 */
router.get('/list', function(req, res, next) { 
  res.status(200).json(list);
});

/**
 * @swagger
 * /products/add:
 *   post:
 *     tags: [Product]
 *     summary: Thêm một sản phẩm mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               price:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Thêm sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: integer
 */
router.post('/add', function(req, res, next) {
  const {id, name, price} = req.body;
  var item = {id: id, name: name, price: price};
  list.push(item);
  res.status(200).json(item);
});

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API để quản lý người dùng
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [User]
 *     summary: Đăng ký người dùng mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Người dùng đã tồn tại
 */
router.post('/register', async function(req, res, next) {
  const {username, password} = req.body;

  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {username: username, password: hashedPassword};
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [User]
 *     summary: Đăng nhập người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Thông tin đăng nhập không hợp lệ
 */
router.post('/login', async function(req, res, next) {
  const {username, password} = req.body;

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful' });
});

module.exports = router;
