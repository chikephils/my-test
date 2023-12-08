const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Please enter a name"],
  },
  category: {
    type: String,
    required: [true, "Please choose a category"],
  },
  sector: {
    type: String,
    required: [true, "Please choose a sector"],
  },
  agreed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
