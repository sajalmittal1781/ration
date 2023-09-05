const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  // amount: { type: Number, required: true },

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  // image: { type: String, required: true },
  // items: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Iteem'}]
  // items: [{ type/: mongoose.Types.ObjectId, required: true, ref: 'Iteem' }]

  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "item",
      },
      quantity: Number,
      name:String,
      price:String,
      image:String
    },
  ],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
