const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();
const port = 3000;

const fileTypeFieldNames = [{ name: "ktp_photo" }, { name: "selfie" }];

// Create a storage engine for multer to specify where to save uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Files will be saved in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name for storage
  },
});

const upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/webhook", upload.fields(fileTypeFieldNames), (req, res) => {
  console.log(
    "===================================================================================================="
  );

  // Handle the incoming webhook data here
  console.log({
    medthod: req.method,
    headers: req.headers,
    body: JSON.parse(JSON.stringify(req.body)),
  });

  if (!_.isEmpty(req.files)) {
    console.log("Received files:", JSON.parse(JSON.stringify(req.files)));
  }

  console.log(
    "===================================================================================================="
  );

  res.sendStatus(200); // Send a success response
});

app.listen(port, () => {
  console.log(`Webhook server is running on port ${port}`);
});
