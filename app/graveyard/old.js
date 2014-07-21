$(document).ready(function() {

  var cachedGalleries = {};

/*==========================================================================
  LOADING PAGE CONTENT
==========================================================================*/

  var loadPageContent = function(pageName, callback) {
    $guts.children('section').remove();
    var newPage = pageName;
    switch (newPage) {
      case "resume":
      case "papn":
      case "csh":
      case "fb":
      case "sns":
      case "petershambora":
      case "wtfdrink":
      case "laura":
      case "resizely":
      case "cpsolutions":
        buildUpGallery(newPage);
        break;
      case "contact":
        repopulateForm();
      default:
        $guts.prepend(injectedHtml.closest('#' + newPage));
    }
    if (callback) {
      callback();
    }
  };

/*==========================================================================
  GALLERY BUILDING
==========================================================================*/

  // Build and setup whatever gallery's been loaded
  var buildUpGallery = function(galleryName) {

    // If the gallery has already been built, don't rebuild it
    if (galleryName in cachedGalleries) {
      $guts.prepend(cachedGalleries[galleryName]);
      return;
    }

    var galleryStatus = galleryInfos[galleryName]["galleryStatus"];
    var onlineBadge = '<svg xmlns="http://www.w3.org/2000/svg" width="88" height="18"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".1" stop-color="#aaa" stop-opacity=".1"/><stop offset=".9" stop-opacity=".3"/><stop offset="1" stop-opacity=".5"/></linearGradient><rect rx="4" width="88" height="18" fill="#555"/><rect rx="4" x="44" width="44" height="18" fill="#4c1"/><path fill="#4c1" d="M44 0h4v18h-4z"/><rect rx="4" width="88" height="18" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="23" y="13" fill="#010101" fill-opacity=".3">status</text><text x="23" y="12">status</text><text x="65" y="13" fill="#010101" fill-opacity=".3">online</text><text x="65" y="12">online</text></g></svg>';
    var offlineBadge = '<svg xmlns="http://www.w3.org/2000/svg" width="89" height="18"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".1" stop-color="#aaa" stop-opacity=".1"/><stop offset=".9" stop-opacity=".3"/><stop offset="1" stop-opacity=".5"/></linearGradient><rect rx="4" width="89" height="18" fill="#555"/><rect rx="4" x="44" width="45" height="18" fill="#e05d44"/><path fill="#e05d44" d="M44 0h4v18h-4z"/><rect rx="4" width="89" height="18" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="23" y="13" fill="#010101" fill-opacity=".3">status</text><text x="23" y="12">status</text><text x="65.5" y="13" fill="#010101" fill-opacity=".3">offline</text><text x="65.5" y="12">offline</text></g></svg>';
    var mockupBadge = '<svg xmlns="http://www.w3.org/2000/svg" width="99" height="18"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".1" stop-color="#aaa" stop-opacity=".1"/><stop offset=".9" stop-opacity=".3"/><stop offset="1" stop-opacity=".5"/></linearGradient><rect rx="4" width="99" height="18" fill="#555"/><rect rx="4" x="44" width="55" height="18" fill="#dfb317"/><path fill="#dfb317" d="M44 0h4v18h-4z"/><rect rx="4" width="99" height="18" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="23" y="13" fill="#010101" fill-opacity=".3">status</text><text x="23" y="12">status</text><text x="70.5" y="13" fill="#010101" fill-opacity=".3">' + galleryStatus + '</text><text x="70.5" y="12">' + galleryStatus + '</text></g></svg>';

    var pageTitle = galleryInfos[galleryName]["galleryTitle"];
    var pageDescription = galleryInfos[galleryName]["galleryDescription"];
    var marqueeImage = galleryInfos[galleryName]["marqueeImage"];
    var marqueeLightbox = galleryInfos[galleryName]["marqueeLightbox"];
    var pageURL = galleryInfos[galleryName]["galleryURL"];
    var pageURLAppearance = galleryInfos[galleryName]["galleryURLAppearance"];
    var statusBadge = '';
    if (galleryStatus === 'online') {
      marqueeImage = '<a href="' + pageURL + '" target="_blank"><img src="' + marqueeImage + '" lightbox="' + marqueeLightbox + '"/></a>';
      statusBadge = onlineBadge;
      pageURL = '<p><strong><a href="' + pageURL + '" target="_blank">' + pageURLAppearance + '</a></strong></p>';
    } else if (galleryStatus === 'offline') {
      marqueeImage = '<img src="' + marqueeImage + '" lightbox="' + marqueeLightbox + '"/>';
      statusBadge = offlineBadge;
      pageURL = '';
    } else {
      marqueeImage = '<img src="' + marqueeImage + '" lightbox="' + marqueeLightbox + '"/>';
      statusBadge = mockupBadge;
      pageURL = '';
    }

    var baseGallery = '';
    if (galleryInfos[galleryName]["subGallery"]) {
      baseGallery += '<section id="' + galleryName + '" class="fadeOut content sub gallery">';
    } else {
      baseGallery += '<section id="' + galleryName + '" class="fadeOut content gallery">';
    }

      baseGallery += '<nav>';
        baseGallery += '<div class="gallery-control previous"></div>';
        baseGallery += '<div class="gallery-control next"></div>';
      baseGallery += '</nav>';
      baseGallery += '<div class="slide" style="left:0%;">';
        baseGallery += '<div class="gallery-panel marquee">';
          baseGallery += '<div class="marquee-image">';
            baseGallery += marqueeImage;
          baseGallery += '</div>';
          baseGallery += '<div class="gallery-title">';
            baseGallery += '<h2 class="hyphenate">' + pageTitle + '</h2>';
          baseGallery += '</div>';
          baseGallery += '<div class="gallery-url">';
            baseGallery += pageURL;
          baseGallery += '</div>';
          baseGallery += '<div class="gallery-status">';
            baseGallery += statusBadge;
          baseGallery += '</div>';
          baseGallery += '<div class="gallery-description">';
            baseGallery += '<p>' + pageDescription + '</p>';
          baseGallery += '</div>';
        baseGallery += '</div>';
      baseGallery += '</div>';

    var additionalGalleries = galleryInfos[galleryName]["additionalGalleries"];
    var additionalGalleryPanels = '';
    for (i = 0; i < additionalGalleries.length; i++) {
      var activeGallery = additionalGalleries[i];
      var lightboxExists = activeGallery[0];
      var extraClasses = activeGallery[1];
      var imageLocation = activeGallery[2];
      var imageDescription = activeGallery[3];
      var n = i + 1;

      additionalGalleryPanels += '<div class="slide" style="left:' + n + '00%;">';
        additionalGalleryPanels += '<div class="gallery-panel repeat ' + extraClasses + '">';
          additionalGalleryPanels += '<div class="gallery-image"><img src="img/sites/' + imageLocation + '" lightbox="' + lightboxExists + '" /></div>';
          additionalGalleryPanels += '<div class="gallery-text"><p>' + imageDescription + '</p></div>';
        additionalGalleryPanels += '</div>';
      additionalGalleryPanels += '</div>';
    }

    var fullGallery = baseGallery + additionalGalleryPanels + '</section>';
    cachedGalleries[galleryName] = fullGallery;
    $guts.prepend(fullGallery);

    $('.gallery .slide:first-of-type').addClass('first');
    $('.gallery .slide:last-of-type').addClass('last');
    $('.previous').addClass('is-disabled');

  };

/*==========================================================================
  GALLERY ANIMATION
==========================================================================*/

  // Global isAnimating variable
  var isAnimating = false;

  // Move backwards through gallery
  $guts.on('click', '.previous', function() {
    if ($('.first').css('left') === "0px") {
      return false;
    }
    if (isAnimating === true) {
      return false;
    }
    isAnimating = true;
    $('.gallery .slide').animate({left: "+=100%"}, 750, function() {
      isAnimating = false;
      if ($('.first').css('left') === "0px") {
        $('.previous').addClass('is-disabled');
      }
    });
    if ($('.next').hasClass('is-disabled')) {
      $('.next').removeClass('is-disabled');
    }
  });

  // Move forwards through gallery
  $guts.on('click', '.next', function() {
    if ($('.last').css('left') === "0px") {
      return false;
    }
    if (isAnimating === true) {
      return false;
    }
    isAnimating = true;
    $('.gallery .slide').animate({left: "-=100%"}, 750, function() {
      isAnimating = false;
      if ($('.last').css('left') === "0px") {
        $('.next').addClass('is-disabled');
      }
    });
    if ($('.previous').hasClass('is-disabled')) {
      $('.previous').removeClass('is-disabled');
    }
  });

});