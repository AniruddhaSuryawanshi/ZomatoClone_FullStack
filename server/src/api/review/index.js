import express from "express";
import { ReviewModel } from "../../database/allModels";
import passport from "passport";
import { ValidateId } from "../../validation/common.validation";

const Router = express.Router();

Router.get("/:resId", async (req, res) => {
  try {
    const { resId } = req.params;
    const reviews = await ReviewModel.find({ restaurants: resId }).sort({
      createdAt: -1,
    });

    return res.json({ reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get(
  "/new",
  passport.authenticate("jwt", { session: false }),

  async (req, res) => {
    try {
      const { _id } = req.user;
      await ValidateId(req.user);

      const { reviewData } = req.body;

      const newReview = await ReviewModel.create({ ...reviewData, user: _id });
      return res.json({ newReview });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

Router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),

  async (req, res) => {
    try {
      const { user } = req;
      const { id } = req.params;
      
      const data = await ReviewModel.findOneAndDelete({
        _id: id,
        user: user._id,
      });

      if (!data) return res, json({ message: "Review was not delivered" });

      return res.json({ message: "successfully Deleted Review", data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default Router;
