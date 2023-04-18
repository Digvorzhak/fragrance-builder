const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Fragrance = require("../models/fragranceModel");

//@desc Get all users
//@route GET /api/v1/users
//@access public

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate("fragrances");
  if (users.length === 0) {
    res.status(400);
    throw new Error("No users!");
  }
  res.status(200).json({ success: true, data: users });
});

//@desc Create New user
//@route POST /api/v1/users
//@access public

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields.");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("This email address is currently in use. Please try a different email address.");
  }
  res.status(404);
  const user = await User.create({
    name,
    email,
    password,
  });
  res.status(201).json({ success: true, data: user });
});

//@desc Get a user
//@route GET /api/v1/users/:id
//@access public

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("fragrances");
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }
  res.status(200).json({ success: true, data: user });
});

//@desc Update a user
//@route PUT /api/v1/users/:id
//@access public

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ success: true, data: updatedUser });
});

//@desc Delete a user
//@route DELETE /api/v1/users/:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }
  if (user.fragrances.length > 0) {
    await Promise.all(
      user.fragrances.map(async (fragrance) => {
        const currentFragrance = await Fragrance.findById(fragrance._id);
        console.log(currentFragrance);
        if (currentFragrance) {
          await currentFragrance.deleteOne();
          console.log(`${fragrance.fragranceName} just got deleted! the ID is ${fragrance._id}`);
        }
      })
    );
    await User.findByIdAndDelete(user._id);
    res.status(200).json({ success: true, data: user });
  } else {
    await User.findByIdAndDelete(user._id);
    res.status(200).json({ success: true, data: user });
  }
});

module.exports = { getAllUsers, createUser, getUser, updateUser, deleteUser };
