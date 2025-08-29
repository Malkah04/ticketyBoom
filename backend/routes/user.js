const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...userData } = user._doc;
    res.status(200).json(userData);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...updatedUserData } = user._doc;
    res.status(200).json(updatedUserData);
  })
);

module.exports = router;
