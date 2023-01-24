import express from "express";
import { ImageModel, MenuModel } from "../../database/allModels";
import { ValidateId } from "../../validation/common.validation";

const Router = express.Router();

Router.get("/list/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await ValidateId(req.params);

    const menus = await MenuModel.findById(_id);

    if (!menus) {
      return res.status(404).json({ error: "No memu present" });
    }
    return res.json({ menus });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get("/image/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await ValidateId(req.params);

    const menuImages = await ImageModel.findById(_id);

    if (!menuImages) {
      return res.status(404).json({ error: "No memu Images present" });
    }
    return res.json({ menus });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
