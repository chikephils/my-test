const express = require("express");
const router = express.Router();
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create User
router.post(
  "/create-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, category, sector, agreed } = req.body;

     
      const user = await User.create({
        name: name,
        category: category,
        sector: sector,
        agreed: agreed,
      });

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
