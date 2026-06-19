const express = require("express");
const cors = require("cors");

const app = express();

/*
=====================================
ROUTES
=====================================
*/
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

/*
=====================================
MIDDLEWARE
=====================================
*/

app.use(cors());
app.use(express.json());

/*
=====================================
API ROUTES
=====================================
*/
app.use("/api/admin",adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications",applicationRoutes);


/*
=====================================
HEALTH CHECK
=====================================
*/

app.get("/", (req, res) => {
  res.send("Placement Portal API Running");
});

module.exports = app;