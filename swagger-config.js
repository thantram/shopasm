const swaggerJSDoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tên dự án 1",
      version: "1.0.0",
      description: "Mô tả về dự án",
    },
  },
  apis: ["./routes/*.js"], // Đường dẫn đến các file định nghĩa API
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
