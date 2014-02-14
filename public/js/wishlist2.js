var width = window.innerWidth;

$(document).ready(function() {
	initializePage();

  $(document).on('touchmove', function(e) {
    e.preventDefault();
  });
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
	geoFindMe();
  swipeTiles();
};

function swipeTiles() {
var wishlist_entry = document.getElementById("swipe1");
var distance = 0;
var direction;
var delta = 0;
$("#swipe1").css({
  left: "0px",
});

var swiped = false;
var readout = document.getElementById("swipe1");
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
 // var hammertime = new Hammer(container, { drag_max_touches: 0 , drag_block_vertical: true});
 //    hammertime.on("drag", function(ev) {

 //        direction = ev.gesture.direction;
 //        distance = ev.gesture.distance;
 //        delta = distance - delta;



 //        readout.innerHTML = "Direction: " + direction + "</br>Distance: " + distance + "</br>Delta: " + delta;
 //        console.log("distance: " + ev.gesture.distance);
 //        console.log(direction);
 //        if (delta < 0) {
 //          distance = -ev.gesture.distance/15;
 //        }
 //        if (direction != "left" && direction != "right") {
 //          distance = 0;
 //        }
 //        if (distance > window.innerWidth) distance = 0;
 //        $("#swipe1").animate({
 //          left: "+="+distance+"px",
 //        }, 0);
 //    });

 //  var hammertime2 = new Hammer(container, { drag_max_touches: 0 });
 //    hammertime2.on("dragend", function(ev) {
 //        console.log("dragend");
 //        $("#swipe1").animate({
 //          left: "0px",
 //        }, 500, 'easeOutCirc');
 //    })
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