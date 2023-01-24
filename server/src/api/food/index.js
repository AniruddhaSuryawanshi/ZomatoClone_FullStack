import express from "express";

import { FoodModel } from "../../database/allModels";
import { ValidateCategory, ValidateId } from "../../validation/common.validation";

const Router = express.Router();

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await ValidateId(req.params);

    const foods = FoodModel.findById(_id);
    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get("/r/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await ValidateId(req.params);

    const foods = await FoodModel.find({
      restaurant: _id,
    });
    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get("/c/:category", async (req, res) => {
  try {
    await ValidateCategory(req.params);

    const { category } = req.params;
    const foods = await FoodModel.find({
      category: { $regex: category, $options: "i" },
    });
    if (!foods) {
      return res
        .status(404)
        .json({ error: `No food matched with ${category}` });
    }
    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
