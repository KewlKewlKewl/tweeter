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