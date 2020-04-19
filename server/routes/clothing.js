const express = require("express");
const fs = require("fs");
const datafile = "server/data/clothing.json";
const router = express.Router();

/* GET all clothing */
const fetchClothingData = () => {
  return new Promise(function handlePromise(resolve, reject) {
    fs.readFile(datafile, "utf8", function handleFetching(err, data) {
      if (err) {
        reject(err);
      } else {
        const clothingData = JSON.parse(data);
        resolve(clothingData);
      }
    });
  });
};

router.route("/").get(function handleClothingRoute(req, res) {
  fetchClothingData()
    .then(function handleSuccess(data) {
      console.log("Success Returning clothing data.");
      res.send(data);
    })
    .catch(function handleError(err) {
      console.log("Error Returning clothing data.");
      res.status(500).send(err);
    })
    .finally(function handleFinally() {
      console.log("All done processing Promises.");
    });
  console.log("Doing more work.");
});

module.exports = router;
