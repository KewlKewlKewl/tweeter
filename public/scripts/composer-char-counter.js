$(document).ready(function() {
  $("#tweet-text").on("input", function(event) {
    const characterLimit = 140;
    const characterCount = this.value.toString().length;

    if (characterCount > characterLimit) {
      $("output").addClass("negative");
    } else {
      $("output").removeClass("negative");
    }

    $("output").text(characterLimit - characterCount);
  })
  
});

//Above function acts as a live feed for the 140 character count content for the tweet form (#tweet-submit). Function uses event handling to adjust character count content.