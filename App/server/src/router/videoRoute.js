const express = require("express");
const router = express.Router();
const videoRouter = require("../youtube_video/get_video.js");

//router to fetch
router.get("/videos", videoRouter.getYoutubeVideo);

module.exports = router;
