const express = require("express");
const app = express();

//importing routes
const videosRoutes = require("./src/router/videoRoute.js");

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Request received for ${req.url}`);
  next();
});

app.use("/youtube", videosRoutes);

// Route
app.get("/", (req, res) => {
  console.log(process.env.YOUTUBE_API_KEY);
  console.log(process.env.CHANNEL_ID);
  res.send("server is serving ...!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = app;
