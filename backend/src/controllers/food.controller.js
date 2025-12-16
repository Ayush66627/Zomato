const foodModel = require("../models/foodItem.model");
const storage = require("../services/storage.service");
const { v4: uuid } = require("uuid");
const likeModel = require("../models/likes.models");
const saveModel = require("../models/save.models");

async function createfoodItem(req, res) {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded"
    });
  }

  try {
    const fileUpload = await storage.uploadFile(req.file.buffer, uuid());

    const foodItem = await foodModel.create({
      name: req.body.name,
      video: fileUpload.url,
      description: req.body.description,
      foodPartner: req.foodpartner._id,
    });

    res.status(201).json({
      message: "Food item created successfully",
      food: foodItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating food item",
      error: error.message
    });
  }
}

async function getfoodItems(req, res) {
  const foodItems = await foodModel.find().populate('foodPartner');

  res.status(200).json({
    message: "Food items fetched successfully",
    foodItems: foodItems,
  });
}

async function likeFood(req, res) {
    console.log("req.body aaya:", req.body);        // ← YE DEKH
    console.log("req.user:", req.user?._id);

    const {foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })

}

async function saveFood(req, res) {

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}

async function getSaveFood(req, res) {

    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });

}


module.exports = {
  createfoodItem,
  getfoodItems,
  likeFood,
  saveFood,
  getSaveFood
};
