"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.
const db = require("./lib/in-memory-db");

// The `data-helpers` module provides an interface to the database of tweets. //REALLY IMPORTANT/COOL TRICK
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
const DataHelpers = require("./lib/data-helpers.js")(db); //pases the db object in here to the helper funcitons imported/required from the datahelpers page

// Update the dates for the initial tweets (data-files/initial-tweets.json).
require("./lib/date-adjust")();

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object //IMPORTANT SAME THING AS THE DB DATA HELPERS PROCESS ABOVE
// so it can define routes that use it to interact with the data layer.
const tweetsRoutes = require("./routes/tweets")(DataHelpers); //PASSES THE DATA HELPERS THAT INTERACT WITH OUR DB TO OUR ROUTES PAGE.

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes); //this intializes the main tweets page with all its routes and code created by passing in the datahlpers to routes tweet above.

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
