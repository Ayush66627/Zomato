const express = require("express");
const multer = require("multer");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const foodController = require("../controllers/food.controller");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authMiddleware.foodpartnerAuth,
  upload.single("video"),
  foodController.createfoodItem
);

router.get("/", authMiddleware.userAuthMiddleware, foodController.getfoodItems);

router.post(
  "/like",
  authMiddleware.userAuthMiddleware,
  foodController.likeFood
);

router.post(
  "/save",
  authMiddleware.userAuthMiddleware,
  foodController.saveFood
);

router.get(
  "/save",
  authMiddleware.userAuthMiddleware,
  foodController.getSaveFood
);

module.exports = router;
