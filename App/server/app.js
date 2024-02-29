const express = require("express");
const app = express();
const cors = require("cors");
//importing routess
const videosRoutes = require("./src/router/videoRoute.js");
const userRoute = require("./src/router/userRoute.js");
const paymentRoute = require("./src/router/paymentRoute.js");
const postRoute = require("./src/router/postRoute.js");
const adminRoute = require("./src/router/adminRoute/superAdminRoute.js");
const eventRotue = require("./src/router/adminRoute/eventRoute.js");
const achivementRoute = require("./src/router/adminRoute/achievementRoute.js");
const historyRotue = require("./src/router/historyRoute.js");
const usrRoute = require("./src/router/adminRoute/userRoute.js");

// Middleware to log requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Request received for ${req.url}`);
  next();
});

app.use("/youtube", videosRoutes);
app.use("/user", userRoute);
app.use("/pay", paymentRoute);
app.use("/post", postRoute);
app.use("/admin", adminRoute);
app.use("/event", eventRotue);
app.use("/achv", achivementRoute);
app.use("/history", historyRotue);
app.use("/api", usrRoute);

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
