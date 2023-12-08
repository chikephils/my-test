const express = require("express");
const router = express.Router();
const Sector = require("../model/sectors");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

//Get all sectors
router.get(
  "/get-sectors",
  catchAsyncError(async (req, res, next) => {
    try {
      const sectors = await Sector.find({});
      res.status(201).json({
        success: true,
        sectors,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
