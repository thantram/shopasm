const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
  id: { type: ObjectId },
  fullname: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  address: { type: String },
});

module.exports = mongoose.models.user || mongoose.model("user", user);
