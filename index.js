const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const vapidKeys = webpush.generateVAPIDKeys();

console.log("VAPID Public Key:", vapidKeys.publicKey);
console.log("VAPID Private Key:", vapidKeys.privateKey);

const publicVapidKey =
  vapidKeys.publicKey;
const privateVapidKey = vapidKeys.privateKey;

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  console.log("!!!!!!!!!!!!!!!!!!!!!\n");
  console.log(req.body);
  console.log("!!!!!!!!!!!!!!!!!!!!!\n");

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: `Привет!` });
  console.log("!!!!!!!!!!!!!!!!!!!!!\n");
  console.log(subscription);
  console.log("!!!!!!!!!!!!!!!!!!!!!\n");

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 5003;

app.listen(port, "0.0.0.0", () => console.log(`Server started on port ${port}`));
