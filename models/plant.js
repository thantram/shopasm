const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const plant = new Schema({
  id: { type: ObjectId }, //khóa chính
  name: { type: String },
  price: { type: Number },
  image: { type: String },
  category: { type:String},
});
module.exports = mongoose.model.plant || mongoose.model("plant", plant);
