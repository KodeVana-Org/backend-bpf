const express = require("express");
const app = express();
console.log(app);
// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Request received for ${req.url}`);
  next();
});

// Route
app.get("/", (req, res) => {
  res.send("server is serving ...!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = app;

