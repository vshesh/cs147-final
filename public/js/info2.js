$(document).ready(function() {
	initializePage();
	//sets up frame.
	var theFrame = $("#mapframe");
	theFrame.height($("#mapframe").width()/2);
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

	$('#menuButton').click(function (e) {
    e.preventDefault();
    //Allows for the back button on the page to mimic back button on browster.
    top.location.href = document.referrer;
  });

  var rating = parseFloat($('#avgRating').text().substring(8));
  console.log(rating);
  var ratingString = "";
  rating = Math.round(rating);
  for(var i = 0; i < rating; i++){
  	ratingString += '<span class="glyphicon glyphicon-star"></span>';
  }
  for(var j = rating; j < 5; j++){
  	ratingString += '<span class="glyphicon glyphicon-star-empty"></span>';
  }
  $('#avgRating').html(ratingString);
};