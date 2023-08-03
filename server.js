const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(bodyParser.json());

app.post("/createNewFile", async (req, res, next) => {
  try {
    const folderName = "log";
    const folderPath = path.join(__dirname, folderName);
    console.log("Path of the specific folder:", folderPath);
    const content = `Current timestamp: ${new Date()}\n`;
    var date = new Date().getDate();
    var time = new Date().getTime();
    var date_time = `${date}_${time}`;

    const file_path = path.join(folderPath, date_time.toString() + ".txt");
    await fs.promises.writeFile(file_path, time.toString());

    res.status(200).json({ message: "File created successfully!", content });
  } catch (error) {
    console.error("Error writing to file:", error);
    res.status(500).json({ error: "Failed to create the file." });
  }
});

app.get("/getallfile", (req, res, next) => {
  try {
    const folderName = "log";
    // Get the absolute path of the specific folder relative to the current script's location
    const folderPath = path.join(__dirname, folderName);
    const files = fs.readdirSync(folderPath);
    console.log(files);
    res.status(200).json({ files: files });
  } catch (err) {
    console.error("Error reading folder:", err);
    return [];
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
