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
};