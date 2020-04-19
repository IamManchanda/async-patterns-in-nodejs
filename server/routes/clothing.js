const express = require("express");
const fs = require("fs");
const datafile = "server/data/clothing.json";
const router = express.Router();

/* GET all clothing */
const fetchClothingData = async () => {
  try {
    const rawData = await fs.promises.readFile(datafile, "utf8");
    const clothingData = JSON.parse(rawData);
    console.log(clothingData);
    return clothingData;
  } catch (error) {
    console.log(error);
  }
};

router.route("/").get(function handleClothingRoute(req, res) {
  (async function handleFetching() {
    try {
      const data = await fetchClothingData();
      console.log("Success Returning clothing data.");
      res.send(data);
    } catch (error) {
      console.log("Error Returning clothing data.");
      res.status(500).send(error);
    } finally {
      console.log("All done processing Promises.");
    }
  })();
  console.log("Doing more work.");
});

module.exports = router;
