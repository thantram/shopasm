const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Thiết lập transporter với thông tin SMTP của bạn
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'trantrongthan30@gmail.com',
    pass: 'oslbcurtmepkeppb'
  }
});

// Route gửi email
router.post('/send-mail', async (req, res) => {
  try {
    const { to, subject, content } = req.body;

    const mailOptions = {
      from: 'tridinhne <trantrongthan30@gmail.com>',
      to: to,
      subject: subject,
      html: content
    };

    await transporter.sendMail(mailOptions);

    res.json({ status: 1, message: 'Gửi mail thành công' });
  } catch (err) {
    res.json({ status: 0, message: 'Gửi mail thất bại' });
  }
});

module.exports = router;
