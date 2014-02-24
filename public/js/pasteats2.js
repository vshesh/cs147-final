$(document).ready(function() {
	initializePage();
});

function initializePage() {
  // $('.glyphicon-share-alt').click(share);
  $('.glyphicon-trash').click(trash);
  $("#btnNo").click(function (e) {
    HideDialog();
    e.preventDefault();
  });

  $("#btnYes").click(function (e) {
    HideDialog();
    deleteEntry(e);
    e.preventDefault();
  });
};

//  function share(e) {
//   
// }

function trash(e) {
  ShowDialog(false);
  e.preventDefault();
}

function deleteEntry(e) {
  //this will eventually actually delete the entry
  $("swipe1").fadeOut(500, function(){
    $("#swipe1").hide(500);
  });
}

function pencil(e) {
}

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
