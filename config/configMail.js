const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "trantrongthan201@gmail.com",
    pass: "hxieblbuvohhjkmf",
  },
});

module.exports = { transporter };


// const nodemailer = require("nodemailer");
// const fs = require("fs");

// async function sendEmail() {
//   // Tạo transporter
//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "trantrongthan201@gmail.com",
//       pass: "hxieblbuvohhjkmf",
//     },
//   });

//   // Đọc nội dung tệp HTML
//   let htmlContent = fs.readFileSync("email_template.html", "utf-8");

//   // Cấu hình email
//   let mailOptions = {
//     from: "Trantrongthan201@gmail.com", // Địa chỉ email của bạn
//     to: "Trantrongthan181905@gmail.com", // Địa chỉ email của người nhận
//     subject: "Chào mừng bạn đến với dịch vụ của chúng tôi!",
//     html: htmlContent,
//   };

//   // Gửi email
//   try {
//     let info = await transporter.sendMail(mailOptions);
//     console.log("Email đã được gửi: " + info.response);
//   } catch (error) {
//     console.error("Lỗi khi gửi email: " + error);
//   }
// }

// sendEmail();
