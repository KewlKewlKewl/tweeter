/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  $("#error-char").hide();
  $("#error-blank").hide();

  //HTML content check for tweets. Allows HTML code to be posted in tweets.
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  //Helper function to be called on loadTweets. Once tweet data is gathered via loadTweets GET request, this functions sorts the tweets and composeses them. 
  const renderTweets = function(tweets) {
    const sortedTweets = tweets.sort((a,b) => b.created_at - a.created_at);
    for (const tweet of sortedTweets) {
      $(".tweets-container").append(createTweetElement(tweet));
    };
  }
  
  //Function which takes in a tweet object and enters the data into HTML. Helper function which helps to render tweets.
  const createTweetElement = function(tweetObj) {
    const $tweet = 
    $(`<br><article class="posted-tweet">
    <header>
      <div class="header-info">
        <div class="user">
          <img src=${tweetObj.user.avatars} class="small-avatar">
          <h3 class="user-info">${tweetObj.user.name}</h3>
        </div>
        <h3 class="user-info">${tweetObj.user.handle}</h3>
      </div>
      <div class="tweet-content">${escape(tweetObj.content.text)}</div>
    </header>
    <footer class="tweet-footer">
      <p>${timeago.format(tweetObj.created_at)}</p>
      <div class="icons">
        <i class="far fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="far fa-heart"></i>
      </div>
    </footer>
    </article>`);
    
    return $tweet;
  }
  
  //Function which handles GET requests via AJAX to tweet database (/tweets). Sends the tweet data through the renderTweets function to display tweets.
  const loadTweets = function() {
    const url = "http://localhost:8080/tweets";
    $.ajax({
      url: url,
      method: "GET"
    })
    .then((success) => {
      $('.tweets-container').empty();
      renderTweets(success);
    })
    .catch((e) => {
      return e;
    });
  }

  loadTweets();

 //Function to handle Tweet Submission via AJAX.
  $("form").submit(function(event) {
    event.preventDefault();
    const characterCounter = $(".counter").val();
    const textAreaMsg = $("#tweet-text").val();

    //Error handling on tweet submission.
    if (characterCounter < 0) {
      $("#error-char").show(500);
    } else if (textAreaMsg === "") {
      $("#error-blank").show(500);
    } else {
      $("#error-char").hide(500);
      $("#error-blank").hide(500);

      const url = "http://localhost:8080/tweets";
      const serialData = $(this).serialize();

      //AJAX POST request. Will clear up text and counter values in tweet form and reload tweets on successful tweet submission/POST.
      $.ajax({
        url: url,
        method: "POST",
        data: serialData
      })
      .then((success) => {
        loadTweets(); 
        $('#tweet-text').val('');
        $('.counter').val("140"); 
      })
    }
  });

  //Event handler for write a new tweet in NAV. On click will focus in on the tweet form.
  $(".nav-content").on("click", (event) => { 
    $("#tweet-text").focus();
  });

});