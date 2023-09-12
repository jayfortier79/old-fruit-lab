const mongoose = require('mongoose');

const vegSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    img: String,
    readyToEat: Boolean,
  },
  {
    timestamps: true,
  }
);

const Vegtable = mongoose.model('Vegtable', vegSchema);

module.exports = Vegtable;