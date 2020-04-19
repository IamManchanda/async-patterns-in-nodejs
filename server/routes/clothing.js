const express = require("express");
const fs = require("fs");
const datafile = "server/data/clothing.json";
const router = express.Router();

/* GET all clothing */
const fetchClothingData = (callback) => {
  fs.readFile(datafile, "utf8", function handleFetching(err, data) {
    if (err) {
      callback(err, null);
    } else {
      const clothingData = JSON.parse(data);
      callback(err, clothingData);
    }
  });
};

router.route("/").get(function handleClothingRoute(req, res) {
  fetchClothingData(function handleFetchingClothing(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Returning clothing data.");
      res.send(data);
    }
  });
  console.log("Doing more work.");
});

module.exports = router;
