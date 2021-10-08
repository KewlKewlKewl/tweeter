/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $("#error-char").hide();
  $("#error-blank").hide();

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    const sortedTweets = tweets.sort((a,b) => b.created_at - a.created_at);
    for (const tweet of sortedTweets) {
      $(".tweets-container").append(createTweetElement(tweet));
    };
  }
  
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

  const loadTweets = function() {
    const url = "http://localhost:8080/tweets";
    $.ajax({ //this AJAX get request will return a promise object with a success or e (a resolved or rejected promise respectively). If resvoled, .then will be called to return/access the promise objects value (the success object which is a array of tweets). If not the catch e wil be called on the rejected promise to return/acess the error value
      url: url,
      method: "GET"
    })
    .then((success) => { //If promise is resolved (is successfull) unrwapre promise object to return success value. Will be the tweets from the /tweest page. WE CAN NOW PASS THIS INTO THE renderTweets function as data (via return sucess;) AND CREATE TWEETS FROM OUR DB.
      $('.tweets-container').empty(); //this makes the DOM Re-render to feed into the renderTweets
      renderTweets(success); //best practice call the function in the .then if u wanna carry over data. This will help you better error handle. ALso for some reason i could not pass loadTweets() in render
    }) // YOU NEED TO CALL RENDER TWEETS HERE BECUASE IF YOU PASS THIS INTO RENDER TWEETS OUTSIDE OF HTE FUNCTION THE SUCESS DATA WONT BE TRANSFERRED BACK OUT (THESE ARE ASYNCS)
    .catch((e) => {
      return e;
    });
  }

 loadTweets();

  $("form").submit(function(event) {
    event.preventDefault();
    const characterCounter = $(".counter").val();
    const textAreaMsg = $("#tweet-text").val();

    //error check
    if (characterCounter < 0) {
      $("#error-char").show(500);
    } else if (textAreaMsg === "") {
      $("#error-blank").show(500);
    } else {
      $("#error-char").hide(500);
      $("#error-blank").hide(500);

      const url = "http://localhost:8080/tweets";
      const serialData = $(this).serialize();

      $.ajax({ //ajax POST request using AJAX call and pormises.Will execute then on sucess. We dont even need to pass in "succes into then" =-> this is just a promise that will execute then if the post request above goes good. This is aying if post method is good loadtweets to empty tweet container and render tweets. THIS IS DONE EVERY POST, THEREFOR CREATING A SPA REFRESH/DYNAMIC REFRESH
        url: url,
        method: "POST",
        data: serialData
      })
      .then((success) => { //on successfull POST call -> load the tweets which means to call the load tweets function (which means to empty posted tweet + section tweet container html section + render your tweets agian with new tweet). THIS ALLOWS FOR DYNMIAC REFRESH IN AJAX
        loadTweets(); 
        $('#tweet-text').val(''); //this will clear your text field on POST
        $('.counter').val("140"); //this will set your coutner back to 140 on POST ALL OF THIS STUFF WORKS TOGETHER TO MAKE A SPA LOOK DYNMIAC AND CREATE A DYNMIAC REFRESH OF TWEETS/DATA
      })
    }
  });

  $(".nav-content").on("click", (event) => { //event handler for write a new tweet-. Will focus in on the tweet form
    $("#tweet-text").focus();
  })

});

// MENTOR CODE
// $.ajax('/tweets', {method: "POST", data: serialData })  
// .then(() => { 
//   loadTweets(); 
//   $('#tweet-text').val('');
//   $('.counter').val("140");
// });
      