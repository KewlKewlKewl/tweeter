"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay"); // JUST ADDS A NICE AFFECT/UI TO OUR SPA

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) { //this DB passed in on the rquired will be used in each function object below. COOL TRICK
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) { //asycn function 
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) { //aysnc function
      simulateDelay(() => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at; //object deconstruction function!!! THIS IS A ARROW NOTATION FUCNTION. uses created.at property of tweet objects. its essntially the callback function created to pass into .sort method. SEE DOCUMENTATION ON .SORT
        callback(null, db.tweets.sort(sortNewestFirst)); //calling .sort function on array using the callback function pased in created above. the callback is used to give the .sort sorting rules. SEE MDN
      });
    }

  };
}
