$(document).ready(function() {
	initializePage();
});

function initializePage() {
  console.log("Javascript connected!");

  $('#previewbox').hide()

  $('#menuButton').click(function (e) {
    ShowDialog(false);
    e.preventDefault();
  });
  
  var fileSelect = document.getElementById("filewrapper"),
  fileElem = document.getElementById("file");

  fileSelect.addEventListener("click", function (e) {
    if (fileElem) {
      fileElem.click();
    }
    e.preventDefault(); // prevent navigation to "#"
  }, false);

  function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#preview').attr('src', e.target.result);
            $('#previewbox').show(300);
        }

        $('#filewrapper').html("Change Photo");
        reader.readAsDataURL(input.files[0]);
    }
}

  $("#file").change(function(){
    readURL(this);
});

  $("#btnNo").click(function (e) {
    HideDialog();
    e.preventDefault();
  });

  $("#btnYes").click(function (e) {
    console.log("back confirmed");
    window.history.back();
    e.preventDefault();
  });
};

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /image.*/;
    
    if (!file.type.match(imageType)) {
      continue;
    }
    
    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    preview.appendChild(img);
    
    var reader = new FileReader();
    reader.onload = (function(aImg) { return funct*
}

 function discard(e) {
        console.log("discard");
        ShowDialog(false);
        e.preventDefault();
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