const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const iteemSchema = new Schema({
  name: { type: String, required: true },
  //   description: { type: String, required: true },
  // image: "https://bizrise.s3.ap-south-1.amazonaws.com/store/img/12658740/product/b41n41n41-6pc6pc/b41n41n41-6pc6pc-1642217544228_1.jpg",
  //   image: { type: String, required: true },
  price: { type: String, required: true },
  quantity:{ type: Number, required: true },
});

module.exports = mongoose.model("Iteem", iteemSchema);
;