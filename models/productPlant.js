const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productPlant = new Schema({
  id: { type: ObjectId }, //khóa chính
  name: { type: String },
  price: { type: Number },
  type: { type: String },
  image: { type: String },
});

module.exports =
  mongoose.models.productPlant || mongoose.model("productPlant", productPlant);
