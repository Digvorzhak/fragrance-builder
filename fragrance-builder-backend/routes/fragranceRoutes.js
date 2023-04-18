const express = require("express");

const router = express.Router();
const { getAllFragrances, createFragrance, getFragrance, updateFragrance, deleteFragrance } = require("../controllers/fragranceController");

router.route("/").get(getAllFragrances);

router.route("/:id").get(getFragrance).post(createFragrance).put(updateFragrance).delete(deleteFragrance);

module.exports = router;
