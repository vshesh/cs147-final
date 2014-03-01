var currentTile;
var currentID;

$(document).ready(function() {
	initializePage();
});

function initializePage() {
  //Possible late implementation - social?
  // $('.glyphicon-share-alt').click(share);

  //Delete entry
  $('.glyphicon-trash').click(trash);
  $(".btnNo").click(function (e) {
    HideDialog();
    e.preventDefault();
  });

  $(".btnYes").click(function (e) {
    HideDialog();
    deleteEntry(e);

    currentTile.fadeOut(300, function(){
    currentTile.hide(300);
  });
    e.preventDefault();
  });
};

//Deleting an element (with confirm)
function trash(e) {
  currentTile = $(this).parent().parent();
  currentID = currentTile.attr('id');
  ShowDialog(false);
  e.preventDefault();
}

function deleteEntry(e) {
  //Deletes the past eats entry by ID
  $.post('/pasteats/remove', {id: currentID}, 
                        function(result, err){
                            if (err) console.log(err)
                          }
                        )
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
