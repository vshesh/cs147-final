var currentTile;
var currentID;

$(document).ready(function() {
	initializePage();
});

function initializePage() {
  //Possible late implementation - social?
  // $('.glyphicon-share-alt').click(share);
};


function ShowDialog(modal){
  $("#overlay").show();
  $("#dialog").fadeIn(300);

  if (modal) {
   $("#overlay").unbind("click");
 } else {
   $("#overlay").click(function (e){
    HideDialog();
  });
 }
}

function HideDialog(){
  $("#overlay").hide();
  $("#dialog").fadeOut(300);
} 
