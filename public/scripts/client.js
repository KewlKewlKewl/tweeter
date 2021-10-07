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
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
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
  renderTweets(data);

  $("#tweet-submit").submit((event) => {
    event.preventDefault()
    const url = "http://localhost:8080/tweets"
    const serialData = $("form").serialize();
    console.log(serialData)
    $.post(url,serialData); //ajax request using jquery lib. You can also use .ajax({}) and pass in a obj -> see here for difference https://stackoverflow.com/questions/12820074/difference-between-post-and-ajax . .Ajax can be used as a promise as well.
  })
});






//takes in tweet obj and returns a tweet article (see html)