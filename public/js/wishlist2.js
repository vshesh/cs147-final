var width = window.innerWidth;
var swiped = false;

$(document).ready(function() {
	initializePage();
  $(document).on('touchmove', function(e) {
    e.preventDefault();
  });
});

 function initializePage() {
   console.log("Javascript connected!");
   geoFindMe();
   swipeTiles();
   $('.glyphicon-remove').each(function(i,e) {
    $(this).click(function (eve) {
      console.log("remove");
      var parent_tile = $(this).parent().parent().parent();
      parent_tile.fadeOut(500, function(){
        console.log("hiding");
        parent_tile.hide(500);
    });
    swiped = false;
  });
 });
 };

 function swipeTiles() {

  $('.wishlist-entry').each(function(i,e) {
    $(this).css({
      left: -width +"px"
    });
    Hammer(e).on("swiperight", function(ev) {
    if(!swiped) {
      console.log('swiperight');
      $(this).animate({
        left: "0px"
      }, 500, 'easeOutCirc');
      swiped = true;
    }
  });
  });
  $('.wishlist-entry').each(function(i,e) {
    Hammer(e).on("swipeleft", function(ev) {
    if(swiped) {
      console.log("swipeleft");
      $(this).animate({
        left: -width + "px",
      }, 500, 'easeOutCirc');
      swiped = false;
    }
  });
  });
}

function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    alert("<p>Geolocation is not supported by your browser</p>");
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
 };

  function error() {
    alert("Unable to retrieve your location");
  };

  navigator.geolocation.getCurrentPosition(success, error);
}