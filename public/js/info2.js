$(document).ready(function() {
	initializePage();
	var theFrame = $("#mapframe");
	theFrame.height($("#mapframe").width()/2);
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

	$('#menuButton').click(function (e) {
    window.history.back();
    e.preventDefault();
  });
};