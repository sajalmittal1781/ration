const express = require("express");
const { check } = require("express-validator");

const itemsControllers = require("../controllers/items-controllers");

const router = express.Router();

router.get("/", itemsControllers.getItems);

router.get("/usercart/:uid", itemsControllers.getItemsByUserId);

router.get("/amount/:uid", itemsControllers.totalAmount);

router.post(
  "/add",
  [
    check("name").not().isEmpty(),
    check("description").isLength({ min: 1 }),
    check("price").not().isEmpty(),
  ],
  itemsControllers.createItem
);

router.post(
  "/cart/:uid",
  [
    check("name").not().isEmpty(),
    check("price").not().isEmpty(),
    check("quantiy").not().isEmpty(),
    // check("quantiy").isInt({ min: 1 }),
  ],
  itemsControllers.addCart
);

module.exports = router;
