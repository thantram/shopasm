var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const config = require("../config");
const { token } = require("morgan");
const { SECRETKEY } = require("../config");
const checkToken = require("../routes/checkToken");
const userModel = require("../models/user");
/* GET users listing. */

// register

router.post("/register", async (req, res) => {
  const { fullname, email, password, phone, address } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    user = new userModel({ fullname, email, phone, password, address });
    await user.save();
    res.status(200).json({ status: true, user: user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đăng ký", error: error.message });
  }
});

// Đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user trong database
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "tài khoản chưa tồn tại" });
    }

    if (user.email === email && user.password === password) {
      const token = JWT.sign({ id: user._id }, config.SECRETKEY, {
        expiresIn: "30s",
      });
      const refreshToken = JWT.sign({ id: user._id }, config.SECRETKEY, {
        expiresIn: "1d",
      });

      return res
        .status(200)
        .json({
          status: true,
          user: user,
          token: token,
          refreshToken: refreshToken,
        });
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Email hoặc mật khẩu không đúng" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Lỗi server, vui lòng thử lại sau" });
  }
});

router.get("/get-profile/", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({email});
    if (user) {
      res.status(200).json({
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    } else {
      res.status(404).json({ message: "Người dùng không tồn tại" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy thông tin người dùng",
      error: error.message,
    });
  }
});

// Cập nhật thông tin người dùng
router.post("/edit-profile", async (req, res) => {
  try {
    const { fullname, email, phone, address } = req.body;
    const user = await userModel.findOne({email})
    if(user){
      user.fullname = fullname ? fullname : user.fullname;
      user.phone = phone ? phone : user.phone;
      user.address = address ? address : user.address;
    }

    await user.save();

    res.status(200).json({
      message: "Thông tin người dùng đã được cập nhật", user: user
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật thông tin người dùng",
      error: error.message,
    });
  }
});

// login
//localhost:3000/users/login
// router.post("/login", async function (req, res, next) {
//   try {
//     const { username, password } = req.body;

//     const checkUser = await users.findOne({ username, password });
//     if (checkUser) {
//       const token = JWT.sign(
//         { user: username, data: "ahihi" },
//         config.SECRETKEY,
//         { expiresIn: "30s" }
//       );
//       const refreshToken = JWT.sign({ user: username }, config.SECRETKEY, {
//         expiresIn: "1d",
//       });

//       res.status(200).json({
//         status: true,
//         message: "Thành công",
//         token: token,
//         refreshToken: refreshToken,
//       });
//     } else {
//       res
//         .status(200)
//         .json({ status: false, message: "Không tìm thấy tài khoản" });
//     }
//   } catch (e) {
//     res.status(401).json({ status: false, message: "Lỗi" });
//   }
// });

router.post("/refreshToken", async function (req, res, next) {
  const { refreshToken } = req.body;

  JWT.verify(refreshToken, config.SECRETKEY, async function (err) {
    if (err) {
      res.status(401).json({ err: err });
    } else {
      var newToken = JWT.sign({ data: "ahihi" }, config.SECRETKEY, {
        expiresIn: "30s",
      });
      res.status(200).json({ token: newToken });
    }
  });
});

module.exports = router;
