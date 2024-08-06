const nodemailer = require('nodemailer');

// Thiết lập transporter với thông tin SMTP của bạn
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Hoặc máy chủ SMTP của bạn
  port: 465,
  secure: true, // true cho cổng 465, false cho các cổng khác
  auth: {
    user: 'your-email@gmail.com', // Thay thế bằng địa chỉ email của bạn
    pass: 'your-email-app-password' // Thay thế bằng mật khẩu ứng dụng email của bạn
  }
});

module.exports = transporter;
