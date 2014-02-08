$(document).ready(function() {
	initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
	var touchzone = document.getElementById('touchzone');
	touchzone.addEventListener('touchstart',touchHandler, false);
}

function touchHandler(event) {
  console.log("touched");
  // Get a reference to our coordinates div
  var coords = document.getElementById("coords");
  // Write the coordinates of the touch to the div
  coords.innerHTML = 'x: ' + event.touches[0].pageX + ', y: ' + event.touches[0].pageY;
}