var width = window.innerWidth;
var swiped = false;

$(document).ready(function() {
	initializePage();
});



 function initializePage() {
   // geoFindMe();

   //Init Swiping
   swipeTiles();

   //Handle removing a wishlist item.
   $('.glyphicon-remove').each(function(i,e) {
    $(e).click(function(ev) {
      ev.preventDefault();
      $.get('/wishlist/remove/', {
        gid: $(this).parent().parent().parent().attr('gid'),
        gref: $(this).parent().parent().parent().attr('gref')
      }, function(result,err) {if (err) console.log(err);});

      var parent_tile = $(this).parent().parent().parent();
      parent_tile.fadeOut(300, function(){
        parent_tile.hide(300);
      });
    swiped = false;
  });
 });
 }


 function swipeTiles() {
  //Swipe on each entry
  $('.wishlist-entry').each(function(i,e) {
    $(this).css({
      left: -width +"px"
    });
    //Swipe open
    Hammer(e).on("swiperight", function(ev) {
      if(!swiped) {
        $(this).animate({
          left: "0px"
        }, 500, 'easeOutCirc');
        swiped = true;
      }
    });
  });
  //Swipe close
  $('.wishlist-entry').each(function(i,e) {
    Hammer(e).on("swipeleft", function(ev) {
      if(swiped) {
        $(this).animate({
          left: -width + "px",
        }, 500, 'easeOutCirc');
        swiped = false;
      }
    });
  });
}

//Find your location (to be implemented?)

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