var cus_key = "consumer_key=oHqaYKxBd5NTq4xZMG1cchZuluycWyr2BI4Ehng4";
var page = 1;
var keyword = "";

var $grid = $('.grid').masonry({
  columnWidth: 50,
  itemSelector: '.grid-item'
});

$('.search').on( 'click', function() {
  page = 1;
  input_keyword = document.getElementById("keyword").value;
  if (input_keyword.length != 0) {
    keyword = input_keyword;
  } else {
    keyword = "popular"
  }
  document.getElementById("grid-id").innerHTML = "";
  document.getElementById("result").setAttribute("class", "container");
  document.getElementById("more").classList.remove("hide");
  document.getElementById("result-header").innerHTML = "Searching for... " + keyword;
  genImage_500px();
  $grid.masonry('layout');
});

function genImage_500px(){
  var url = "https://api.500px.com/v1/photos/search?term=" + keyword + "&" + cus_key + "&image_size=1080" + "&page=" + page;

  $.get(url,function(json){
    $.each(json.photos,function(i, item){
      var $item = $('<img id="' + item.id + '" class="grid-item" src="'+ item.image_url + '"onclick="openModel(' + item.id + ')">');
      $grid.append( $item ).masonry( 'appended', $item );
      $grid.masonry('layout');
    })
  })
}

function genImageModal(imageID){
  var image_size = "image_size=4"
  var url = "https://api.500px.com/v1/photos/" + imageID + "?" + image_size + "&" + cus_key;
  $.get(url,function(json){
    var image = json.photo;
    var user_id = image.user_id;
    var name = image.name;
    var image_url  = image.image_url;

    document.getElementById("modal-img-id").innerHTML = name + " - " + imageID;
    document.getElementById("modal-img").setAttribute("src", image_url);
    document.getElementById("camera-model").innerHTML = image.camera;
    document.getElementById("lens-model").innerHTML = image.lens;
    document.getElementById("aperture-info").innerHTML = image.aperture;
    document.getElementById("shutter-speed-info").innerHTML = image.shutter_speed;
    document.getElementById("iso-info").innerHTML = image.iso;
    genUserInfo(user_id);
  })
}

function genUserInfo(user_id){
  var url = "https://api.500px.com/v1/users/show?id=" + user_id + "&" + cus_key;
  $.get(url,function(json){
    var user = json.user;
    var fullname = user.firstname + " " + user.lastname;
    document.getElementById("modal-user-fullname").innerHTML = fullname;
    document.getElementById("modal-user-avatar").setAttribute("src", user.userpic_url);
  })
}

function openModel(imageID){
  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the span
  var span = document.getElementsByClassName("close")[0];

  // Display modal when user clicks on image
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
  genImageModal(imageID);
}

$('#more').on( 'click', function() {
  console.log("clicked")
  page = page + 1;
  genImage_500px();
});
