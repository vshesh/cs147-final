var width = window.innerWidth;

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
   $("#remove").click(function (e) {
    $("#swipe1").fadeOut(500, function(){
      console.log("hiding");
      $("#swipe1").hide(500);
    });
    e.preventDefault();
  });
 };

 function swipeTiles() {
  var wishlist_entry = document.getElementById("swipe1");
  $("#swipe1").css({
    left: "0px",
  });

  var swiped = false;
  var hammertime = new Hammer(wishlist_entry);
  hammertime.on("swipeleft", function(ev) {
    if(!swiped) {
      console.log("swipeleft");
      $("#swipe1").animate({
        left: -width + "px",
      }, 500, 'easeOutCirc');
      swiped = true;
    }
  });
  hammertime.on("swiperight", function(ev) {
    if(swiped) {
      console.log("swiperight");
      $("#swipe1").animate({
        left: "0px",
      }, 500, 'easeOutCirc');
      swiped = false;
    }
  });
}

function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}