var width = window.innerWidth;
var swiped = false;

$(document).ready(function() {
	initializePage();
  $(document).on('touchmove', function(e) {
    e.preventDefault();
  });
});


$(function(){
  var targets = $('[rel~=tooltip]'),
      target = false,
      tolltip = false,
      title = false;

  targets.bind('mouseenter', function(){
      target = $(this);
      tip = target.attr('title');
      tooltip = $('<div id = "tooltip"></div>');
      if( !tip || tip === '') return false;

      target.removeAttr('title');
      console.log($(this).attr('class'));
      tooltip.css('opacity', 0).html(tip).appendTo('body');

      var initTooltip = function(){
        if($(window).width() < tooltip.outerWidth() * 1.5)
          tooltip.css( 'max-width', $(window).width()/2);
        else
          tooltip.css('max-width', 340);

        var posLeft = target.offset().left + (target.outerWidth()/2) - (tooltip.outerWidth() / 2),
            posTop = target.offset().top - tooltip.outerHeight() - 20;

        if(posLeft < 0){
          posLeft = target.offset().left + target.outerWidth()/2 - 20;
          tooltip.addClass('left');
        }else tooltip.removeClass('left');
        

        if(posLeft + tooltip.outerWidth() > $(window).width()){
          posLeft = target.offset().left - tooltip.outerWidth() + target.outerWidth()/2 + 20;
          tooltip.addClass('right');
        }else tooltip.removeClass('right');

        if(posTop < 0){
          posTop = target.offset().top + target.outerHeight();
          tooltip.addClass('top');
        } else tooltip.removeClass('top');

        console.log('made it to before animate in!');
        tooltip.css( {left:posLeft, top:posTop}).animate({top: '+= 10', opacity: 1}, 50);
      };

      initTooltip();
      $(window).resize(initTooltip);

      var removeTooltip = function(){
        tooltip.animate({top:'-=10', opacity:0}, 50, function(){
          $(this).remove();
        });
        target.attr('title', tip);
      };

      target.bind('mouseleave', removeTooltip);
      tooltip.bind('click', removeTooltip);

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