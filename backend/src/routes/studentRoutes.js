const express = require("express");

const router = express.Router();

const {
  getStudentProfile,
  createStudentProfile,
  updateStudentProfile,
} = require("../controllers/studentController");

router.get(
  "/profile/:clerkId",
  getStudentProfile
);

router.post(
  "/create-profile",
  createStudentProfile
);

router.put(
  "/update-profile",
  updateStudentProfile
);

module.exports = router;