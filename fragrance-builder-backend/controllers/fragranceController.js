const asyncHandler = require("express-async-handler");
const Fragrance = require("../models/fragranceModel");
const notes = require("../scrape/notes.json");
const User = require("../models/userModel");

function getImagePathForNoteName(noteName) {
  console.log(noteName);
  const note = notes.find((n) => n.note.toLowerCase() === noteName.toLowerCase());
  return note ? note.image : null;
}

//@desc Get all fragrances
//@route GET /api/v1/fragrances
//@access public

const getAllFragrances = asyncHandler(async (req, res) => {
  const fragrances = await Fragrance.find();
  res.status(200).json({ success: true, data: fragrances });
});

//@desc Create New Fragrances
//@route POST /api/v1/fragrances/:id
//@access public

const createFragrance = asyncHandler(async (req, res) => {
  const topNotesSet = new Set(req.body.topNotes.map((note) => note.note.toLowerCase()));
  const topNotes = await Promise.all(
    [...topNotesSet].map(async (noteName) => {
      const imagePath = getImagePathForNoteName(noteName);
      if (!imagePath) {
        res.status(404);
        throw new Error(`Top note ${noteName} is not found.`);
      }
      return { noteName, image: imagePath };
    })
  );
  if (!topNotes.length) {
    res.status(404);
    throw new Error("Please enter at least one valid top note.");
  }
  const middleNotesSet = new Set(req.body.middleNotes.map((note) => note.note.toLowerCase()));
  const middleNotes = await Promise.all(
    [...middleNotesSet].map(async (noteName) => {
      const imagePath = getImagePathForNoteName(noteName);
      if (!imagePath) {
        res.status(404);
        throw new Error(`Middle note ${noteName} is not found.`);
      }
      return { noteName, image: imagePath };
    })
  );
  if (!middleNotes.length) {
    res.status(404);
    throw new Error("Please enter at least one valid middle note.");
  }
  const baseNotesSet = new Set(req.body.baseNotes.map((note) => note.note.toLowerCase()));
  const baseNotes = await Promise.all(
    [...baseNotesSet].map(async (noteName) => {
      const imagePath = getImagePathForNoteName(noteName);
      if (!imagePath) {
        res.status(404);
        throw new Error(`Base note ${noteName} is not found.`);
      }
      return { noteName: noteName, image: imagePath };
    })
  );
  if (!baseNotes.length) {
    res.status(404);
    throw new Error("Please enter at least one valid base note.");
  }
  console.log(topNotes);
  console.log(middleNotes);
  console.log(baseNotes);
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }
    const fragrance = await Fragrance.create({
      name: req.body.name,
      creatorName: user.name,
      creator_id: user._id,
      topNotes: topNotes,
      middleNotes: middleNotes,
      baseNotes: baseNotes,
    });
    console.log(req.body);
    console.log(fragrance);
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $push: { fragrances: { fragranceName: req.body.name, _id: fragrance._id } } }, { new: true });
    console.log(updatedUser);
    res.status(201).json({ success: true, data: fragrance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create fragrance" });
  }
});

//@desc Get an fragrance
//@route GET /api/v1/fragrances/:id
//@access public

const getFragrance = asyncHandler(async (req, res) => {
  const fragrance = await Fragrance.findById(req.params.id);
  if (!fragrance) {
    res.status(404);
    throw new Error("Fragrance not found.");
  }
  res.status(200).json({ success: true, data: fragrance });
});

//@desc Update a fragrance
//@route PUT /api/v1/fragrances/:id
//@access public

const updateFragrance = asyncHandler(async (req, res) => {
  const userID = req.params.id;
  const fragranceID = req.body.id;
  const user = await User.findById(userID);
  const fragrance = await Fragrance.findById(fragranceID);
  if (!user) {
    res.status(404);
    throw new Error("User is not found.");
  }

  if (!fragrance) {
    res.status(404);
    throw new Error("Fragrance is not found");
  }
  if (fragrance.creator_id !== userID) {
    res.status(403);
    throw new Error(`You are not the owner of this fragrance. Access denied.`);
  }
  const topNotesSet = new Set(req.body.topNotes.map((note) => note.note.toLowerCase()));
  const topNotes = await Promise.all(
    [...topNotesSet].map(async (noteName) => {
      const imagePath = getImagePathForNoteName(noteName);
      if (!imagePath) {
        res.status(404);
        throw new Error(`Top note ${noteName} is not found.`);
      }
      return { noteName: noteName, image: imagePath };
    })
  );
  if (!topNotes.length) {
    res.status(404);
    throw new Error("Please enter at least one valid top note.");
  }
  const middleNotesSet = new Set(req.body.middleNotes.map((note) => note.note.toLowerCase()));
  const middleNotes = await Promise.all(
    [...middleNotesSet].map(async (noteName) => {
      const imagePath = getImagePathForNoteName(noteName);
      if (!imagePath) {
        res.status(404);
        throw new Error(`Middle note ${noteName} is not found.`);
      }
      return { noteName: noteName, image: imagePath };
    })
  );
  if (!middleNotes.length) {
    res.status(404);
    throw new Error("Please enter at least one valid middle note.");
  }
  const baseNotesSet = new Set(req.body.baseNotes.map((note) => note.note.toLowerCase()));
  const baseNotes = await Promise.all(
    [...baseNotesSet].map(async (noteName) => {
      const imagePath = getImagePathForNoteName(noteName);
      if (!imagePath) {
        res.status(404);
        throw new Error(`Base note ${noteName} is not found`);
      }
      return { noteName: noteName, image: imagePath };
    })
  );
  if (!baseNotes.length) {
    res.status(404);
    throw new Error("Please enter at least one valid base note.");
  }
  console.log(topNotes);
  console.log(middleNotes);
  console.log(baseNotes);

  try {
    const updatedFragrance = await Fragrance.findByIdAndUpdate(
      fragranceID,
      {
        name: req.body.name,
        creatorName: user.name,
        creator_id: userID,
        topNotes: topNotes,
        middleNotes: middleNotes,
        baseNotes: baseNotes,
      },
      { new: true }
    );
    const oldUser = await User.findByIdAndUpdate(userID, { $pull: { fragrances: { _id: fragranceID } } }, { new: true });
    const newUser = await User.findByIdAndUpdate(userID, { $push: { fragrances: { fragranceName: req.body.name, _id: fragranceID } } }, { new: true });
    // console.log(newUser);
    res.status(200).json({ success: true, data: updatedFragrance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Failed to update fragrance." });
  }
});

//@desc Delete a fragrance
//@route DELETE /api/v1/fragrances/:id
//@access public

const deleteFragrance = asyncHandler(async (req, res) => {
  const fragrance_id = req.body.fragrance_id;
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User is not found.");
  }
  const fragrance = await Fragrance.findById(fragrance_id);
  if (!fragrance) {
    res.status(404);
    throw new Error("Fragrance is not found.");
  }
  if (fragrance.creator_id !== req.params.id) {
    res.status(403);
    throw new Error(`You are not the owner of this fragrance. Access denied.`);
  }
  await fragrance.deleteOne({ _id: fragrance_id });
  const updatedUser = await User.findByIdAndUpdate(req.params.id, { $pull: { fragrances: { _id: fragrance_id } } }, { new: true });
  console.log(updatedUser);
  res.status(200).json({ success: true, data: updatedUser });
});

module.exports = {
  getAllFragrances,
  createFragrance,
  getFragrance,
  updateFragrance,
  deleteFragrance,
};
