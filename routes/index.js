const express = require("express");

const authRoutes = require("../components/auth");
const adminRoutes = require("../components/admin");
const homeRoutes = require("../components/home");

const router = express.Router();

app.use(homeRoutes);
app.use(authRoutes);
app.use("/admin", adminRoutes);

module.exports = router;