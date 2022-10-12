const Category = require("../models/category");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Create new genere   =>   /api/v1/admin/category/new
exports.newCategory = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  if (!category) {
    return next(new ErrorHandler("User not found with this email", 404));
  }
  res.status(201).json({
    success: true,
    category,
  });
});

// Get all genres   =>   /api/v1/genres
exports.getCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.find();

  res.status(200).json({
    success: true,
    category,
  });
});

// Delete Category   =>   /api/v1/admin/category/:id
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.genreID);

  if (!category) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: "Product is deleted.",
  });
});
