$(function(){
  var fadeShow = $(".background").fadeShow({
    correctRatio: true,
    shuffle: true,
    speed: 10000,
    images: ['./assets/img/maxresdefault.jpg',
         './assets/img/rain.jpg',
         './assets/img/rain-umbrella.jpg']
  });
});

$('a[href^="#result"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});

jQuery(document).ready(function() {
    var offset = 220;
    var duration = 500;
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top').fadeIn(duration);
        } else {
            jQuery('.back-to-top').fadeOut(duration);
        }
    });

    jQuery('.back-to-top').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })
});
