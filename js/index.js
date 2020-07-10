var $navOverlay  = $('.nav_overlay'),
    $overlayMenu = $('.overlay_menu'),
    $toggle      = $('.hamb_toggle'),
    $toggleName  = $toggle.find('.toggle_name');

$(document).on('click', '.nav_toggle', function() {

  $navOverlay.toggleClass('is-open');
  $toggle.toggleClass('is-open');
  $toggleName.toggleClass('is-open');
  
  // Let's scroll onClick
  var offset = $overlayMenu.find('li:first').offset().top;
  if($navOverlay.hasClass('is-open')) {
    setTimeout(function() {
      $('html, body').animate({
        scrollTop: offset - 100
      }, 200);
    }, 300);
  }
});
///---- new

$(document).on('click', '.fix_top', function(event) {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, 500);
  setTimeout(function() {
    $navOverlay.removeClass('is-open');
    $toggle.removeClass('is-open');
    $toggleName.removeClass('is-open');
  }, 550);
});