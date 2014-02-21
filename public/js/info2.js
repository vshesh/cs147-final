$(document).ready(function() {
	initializePage();
	var theFrame = $("#mapframe");
	theFrame.height($("#mapframe").width()/2);
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");

	$('#menuButton').click(function (e) {
		console.log("back clicked");
    window.history.back();
    e.preventDefault();
  });
};