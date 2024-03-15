// const admin = require("firebase-admin");
// const config = require("../../google-services.json");
// // Initialize Firebase Admin SDK with your service account credentials
// admin.initializeApp({
//   credential: admin.credential.cert(config),
// });
//
// const sendPushNotification = async (
//   message,
//   thumbnailUrl,
//   channelName,
//   videoTitle,
// ) => {
//   try {
//     // Define the notification payload
//     const payload = {
//       notification: {
//         title: "YouTube Live Notification",
//         body: message,
//       },
//       // Include additional data in the data payload
//       data: {
//         thumbnailUrl: thumbnailUrl,
//         channelName: channelName,
//         videoTitle: videoTitle,
//       },
//     };
//
//     // Send the notification to all app instances subscribed to the topic "youtube_live"
//     await admin.messaging().sendToTopic("youtube_live", payload);
//     console.log("Push notification sent successfully.");
//   } catch (error) {
//     console.error("Error sending push notification:", error);
//   }
// };
//
// module.exports = sendPushNotification;
