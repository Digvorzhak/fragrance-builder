const mongoose = require("mongoose");

const fragranceSchema = new mongoose.Schema({
  fragrance_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  creatorName: {
    type: String,
    required: [true, `Owner's name is required!`],
  },
  creator_id: {
    type: String,
    required: [true, "Owner ID is required!"],
  },
  topNotes: [
    {
      noteName: {
        type: String,
        required: [true, "Note name is required!"],
      },
      image: {
        type: String,
        required: [true, "Note image is required!"],
      },
    },
  ],
  middleNotes: [
    {
      noteName: {
        type: String,
        required: [true, "Note name is required!"],
      },
      image: {
        type: String,
        required: [true, "Note image is required!"],
      },
    },
  ],
  baseNotes: [
    {
      noteName: {
        type: String,
        required: [true, "Note name is required!"],
      },
      image: {
        type: String,
        required: [true, "Note image is required!"],
      },
    },
  ],
});

const Fragrance = mongoose.model("Fragrance", fragranceSchema);

module.exports = Fragrance;
