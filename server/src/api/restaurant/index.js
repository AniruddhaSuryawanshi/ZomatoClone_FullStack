import express from "express";
import { RestaurantModel } from "../../database/allModels";
import {
  ValidateId,
  ValidateSearchString,
} from "../../validation/common.validation";

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const { city } = req.query;

    const restaurants = await RestaurantModel.find({ city });
    if (restaurants.length === 0) {
      return res.json({ error: "No restaurant found in city" });
    }
    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await ValidateId(req.params);

    const restaurant = await RestaurantModel.findById(_id);
    if (!restaurant) {
      return res.status(400).json({ error: "Restaurant not found" });
    }
    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get("/search/:searchString", async (req, res) => {
  try {
    const { searchString } = req.params;
    await ValidateSearchString(req.params);

    const restaurants = await RestaurantModel.find({
      name: { $regex: searchString, $oprions: "i" },
    });
    if (!restaurants.length === 0) {
      return res.status(404).json({ error: "No restaurant fount with string" });
    }
    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
