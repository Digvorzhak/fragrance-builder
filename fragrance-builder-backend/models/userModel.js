const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
  },
  fragrances: [
    {
      fragranceName: {
        type: String,
      },
      fragrance_id: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
