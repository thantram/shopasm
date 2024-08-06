const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const plantCate = new Schema({
  id: { type: ObjectId }, // khóa chính
  name: {
    type: String, // kiểu dữ liệu
    required: true, // bắt buộc phải có
    unique: true, // không được trùng
    trim: true, // bỏ khoảng trắng 2 đầu
    minlength: 3, // độ dài tối thiểu
    maxlength: 50, // độ dài tối đa
    default: "No name", // giá trị mặc định
  },
});
module.exports =
  mongoose.models.plantCate || mongoose.model("plantCate", plantCate);
// category -----> categories
