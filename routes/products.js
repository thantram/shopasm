const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

let list = [
  { 'id': 1, 'name': 'banh', 'price': 5000 }
];

// Mảng để lưu trữ thông tin người dùng
let users = [];

// Lấy danh sách sản phẩm
router.get('/list', function(req, res, next) { 
  res.status(200).json(list);
});

// Thêm một sản phẩm mới
router.post('/add', function(req, res, next) {
  const {id, name, price} = req.body;

  var item = {id: id, name: name, price: price};
  list.push(item);
  res.status(200).json(item);
});

// Đăng ký người dùng mới
router.post('/register', async function(req, res, next) {
  const {username, password} = req.body;

  // Kiểm tra xem người dùng đã tồn tại chưa
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Thêm người dùng mới vào mảng users
  const newUser = {username: username, password: hashedPassword};
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

// Đăng nhập người dùng
router.post('/login', async function(req, res, next) {
  const {username, password} = req.body;

  // Tìm kiếm người dùng với username
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Kiểm tra mật khẩu
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful' });
});

module.exports = router;
