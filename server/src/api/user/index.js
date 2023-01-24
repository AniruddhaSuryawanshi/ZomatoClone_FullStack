import express from "express";
import { UserModel } from "../../database/allModels";
import passport from "passport";
import { ValidateId } from "../../validation/common.validation";

const Router = express.Router();

Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { email, fullName, phoneNumber, address } = req.user;
      return res.json({ user: { email, fullName, phoneNumber, address } });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await ValidateId(req.params);

    const getUser = await UserModel.findById(_id);
    const { fullName } = getUser;
    if (!getUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ user: { fullName } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.put(
  "/update:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.params;
      await ValidateId(req.params);

      const { userData } = req.body;

      userData.password= undefined;

      const updateUserData = await UserModel.findById(
        _id,
        {
          $set: userData,
        },
        {
          new: true,
        }
      );
      return res.json({ user: updateUserData });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default Router;
