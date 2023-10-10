const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Item = require("../models/item");
const Iteem = require("../models/Iteem");
const User = require("../models/user");

const createItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, description, price, image } = req.body;

  const createdItem = new Item({
    name,
    description,
    price,
    image,
    // "https://bizrise.s3.ap-south-1.amazonaws.com/store/img/12658740/product/b41n41n41-6pc6pc/b41n41n41-6pc6pc-1642217544228_1.jpg", // => File Upload module, will be replaced with real image url
  });

  // console.log(createdItem);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdItem.save({ session: sess });
    //   user.places.push(createdPlace);
    //   await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating item failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ item: createdItem });
};

const getItems = async (req, res, next) => {
  let items;
  try {
    items = await Item.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching items failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ items: items.map((item) => item.toObject({ getters: true })) });
};

const addCart = async (req, res, next) => {
  const userId = req.params.uid;

  const { item_id, name, quantity, price, description, image } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(" failed, please try again.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  const item = await Item.findById(item_id).exec();
  if (!item) {
    throw new Error(`Product ${item_id} not found`);
  }

  let existingItem = false;
  if (user.items) {
    existingItem = user.items.find((item) => item._id == item_id);
  }

  console.log(typeof(quantity));

  if (existingItem) {
    const id = existingItem._id;

    if (quantity === "0") {
      try {
        // await User.updateOne(
        //   { _id: userId, "items._id": id },
        //   { $pull: { "items.$.quantity": quantity } }
        // );
        // console.log("remove");
        await user.items.pull({ _id: item_id, quantity, name, price, image });
        await user.save();
        // console.log(user.items);
      } catch (err) {
        console.log(err);
        const error = new HttpError(
          "Creating item failed, please try again.",
          500
        );
        return next(error);
      }
    } else {
      try {
        await User.updateOne(
          { _id: userId, "items._id": id },
          {
            $set: {
              "items.$.quantity": quantity,
            },
          }
        );
      } catch (err) {
        console.log(err);
        const error = new HttpError(
          "Something went wrong, could not update item11.",
          500
        );
        return next(error);
      }
    }
  } else {
    try {
      user.items.push({ _id: item_id, quantity, name, price, image });
      await user.save();
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        "Creating item failed, please try again.",
        500
      );
      return next(error);
    }
  }

  res.json({ message: "done" });
};

const getItemsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithItems;
  try {
    userWithItems = await User.findById(userId).select("items");
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fetching items failed, please try again later.",
      500
    );
    return next(error);
  }

  // console.log(userWithItems.items);

  if (!userWithItems || userWithItems.items.length === 0) {
    return next(
      new HttpError("Could not find items for the provided user id.", 404)
    );
  }

  res.json({
    items: userWithItems.items.filter((item) => item.quantity!==0),
  });
};

const totalAmount = async (req, res, next) => {
  const userId = req.params.uid;
  let amount = 0;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(" failed, please try again.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  try {
    let i = user.items.length;

    for (var k = 0; k < i; k++) {
      amount +=
        parseInt(user.items[k].price) * parseInt(user.items[k].quantity);
    }
  } catch (err) {
    console.log(err);
    const error = new HttpError("failed, please try again later.", 500);
    return next(error);
  }

  console.log(amount);
  res.json({ amount: amount });
};

exports.getItemsByUserId = getItemsByUserId;
exports.totalAmount = totalAmount;

exports.createItem = createItem;
exports.addCart = addCart;

exports.getItems = getItems;
