const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema({
  category: String,
  sectors: [
    {
      name: String,
    },
  ],
});

module.exports = mongoose.model("Sector", sectorSchema);
