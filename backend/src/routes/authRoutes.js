const express = require("express");

const router = express.Router();

const {
  syncUser,
  assignRole,
  getUserByClerkId
} = require("../controllers/authController");

/*
=====================================
ROUTES
=====================================
*/

router.post("/sync-user", syncUser);

router.post("/assign-role", assignRole);

router.get("/user/:clerkId", getUserByClerkId);

module.exports = router;