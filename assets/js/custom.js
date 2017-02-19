var $grid = $('.grid').masonry({
  columnWidth: 50,
  itemSelector: '.grid-item'
});

$('.append-button').on( 'click', function() {
  genImage_500px();
});

var cus_key = "consumer_key=oHqaYKxBd5NTq4xZMG1cchZuluycWyr2BI4Ehng4";

function genImage_500px(){
  // var cus_key = "consumer_key=oHqaYKxBd5NTq4xZMG1cchZuluycWyr2BI4Ehng4";
  var url = "https://api.500px.com/v1/photos/search?term=" + "nature" + "&" + cus_key + "&image_size=1080"
  $.get(url,function(json){
    $.each(json.photos,function(i, item){
      // console.log(item);
      var $item = $('<img id="' + item.id + '" class="grid-item" src="'+ item.image_url + '"onclick="openModel(' + item.id + ')">');
      $grid.append( $item ).masonry( 'appended', $item );
      $grid.masonry('layout');
    })
  })
}

function genImageModal(imageID){
  // clearBox("myModal");
  // var cus_key = "consumer_key=oHqaYKxBd5NTq4xZMG1cchZuluycWyr2BI4Ehng4";
  var image_size = "image_size=4"
  var url = "https://api.500px.com/v1/photos/" + imageID + "?" + image_size + "&" + cus_key;
  $.get(url,function(json){
    var image = json.photo;
    var user_id = image.user_id;
    var name = image.name;
    var image_url  = image.image_url;
    console.log(image);
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
    console.log(fullname);
    document.getElementById("modal-user-fullname").innerHTML = fullname;
    document.getElementById("modal-user-avatar").setAttribute("src", user.userpic_url);

  })
}

function openModel(imageID){
  // Get the modal
  console.log(imageID);
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  // var btn = document.getElementById('id');
  // console.log(btn);
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  //When the user clicks the button, open the modal
  // btn.onclick = function() {
  //     modal.style.display = "block";
  // }

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
