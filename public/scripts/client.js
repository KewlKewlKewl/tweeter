/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Wayne Gretzky",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@#99" },
    "content": {
      "text": "You miss 100% of the shots you dont take."
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {
  $("#error-char").hide();
  $("#error-blank").hide();

  const renderTweets = function(tweets) {
    const sortedTweets = tweets.sort((a,b) => b.created_at - a.created_at);
    for (const tweet of sortedTweets) {
      $(".tweets-container").append(createTweetElement(tweet));
    }
  }
  
  const createTweetElement = function(tweetObj) {
    const $tweet = 
    $(`<br><article class="posted-tweet">
    <header>
      <div class="header-info">
        <div class="user">
          <i class="fas fa-feather"></i>
          <h3 class="user-info">${tweetObj.user.name}</h3>
        </div>
        <h3 class="user-info">${tweetObj.user.handle}</h3>
      </div>
      <div class="tweet-content">${tweetObj.content.text}</div>
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

  const loadTweets = function() {
    const url = "http://localhost:8080/tweets";
    $.ajax({ //this AJAX get request will return a promise object with a success or e (a resolved or rejected promise respectively). If resvoled, .then will be called to return/access the promise objects value (the success object which is a array of tweets). If not the catch e wil be called on the rejected promise to return/acess the error value
      url: url,
      method: "GET"
    })
    .then((success) => { //If promise is resolved (is successfull) unrwapre promise object to return success value. Will be the tweets from the /tweest page. WE CAN NOW PASS THIS INTO THE renderTweets function as data (via return sucess;) AND CREATE TWEETS FROM OUR DB.
      renderTweets(success); //best practice call the function in the .then if u wanna carry over data. This will help you better error handle. ALso for some reason i could not pass loadTweets() in render
    }) // YOU NEED TO CALL RENDER TWEETS HERE BECUASE IF YOU PASS THIS INTO RENDER TWEETS OUTSIDE OF HTE FUNCTION THE SUCESS DATA WONT BE TRANSFERRED BACK OUT (THESE ARE ASYNCS)
    .catch((e) => {
      return e;
    });
  }

 loadTweets();

  $("#tweet-submit").submit(function(event) {
    event.preventDefault();
    const characterCount = $(".counter").val();
    const textAreaMsg = $("#tweet-text").val();

    if (characterCount < 0) {
     return $("#error-char").show(500)
    }

    if(textAreaMsg === "") {
      return $("#error-blank").show(500)
    }

    const url = "http://localhost:8080/tweets";
    const serialData = $("form").serialize();
    $.post(url,serialData); //ajax request using jquery lib. You can also use .ajax({}) and pass in a obj -> see here for difference https://stackoverflow.com/questions/12820074/difference-between-post-and-ajax . .Ajax can be used as a promise as well.
    location.reload(); 
  })

});