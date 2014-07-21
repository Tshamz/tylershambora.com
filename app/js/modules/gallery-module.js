(function($, Gallery, undefined) {

  var checkForGalleryInCache = function(galleryName) {
    if (galleryName in galleryCache) {
      return true;
    } else {
      return false;
    }
  };
  var retrieveGalleryFromCache = function(galleryName) {
    return galleryCache[galleryName];
  };
  var addGalleryToCache = function(galleryName, fullGallery) {
    galleryCache[galleryName] = fullGallery;
  };
  var retrieveGalleryInfo = function(galleryName) {
    return Resources.galleryInfo[galleryName];
  };
  var buildGalleryStatusBadge = function(width1, width2, color, text, textX) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width1 + '" height="18"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".1" stop-color="#aaa" stop-opacity=".1"/><stop offset=".9" stop-opacity=".3"/><stop offset="1" stop-opacity=".5"/></linearGradient><rect rx="4" width="' + width1 + '" height="18" fill="#555"/><rect rx="4" x="44" width="' + width2 + '" height="18" fill="' + color + '"/><path fill="' + color + '" d="M44 0h4v18h-4z"/><rect rx="4" width="' + width1 + '" height="18" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="23" y="13" fill="#010101" fill-opacity=".3">status</text><text x="23" y="12">status</text><text x="' + textX + '" y="13" fill="#010101" fill-opacity=".3">' + text + '</text><text x="' + textX + '" y="12">' + text + '</text></g></svg>';
  };
  var setMainGalleryConditions = function(galleryInfo) {
    var marqueeImageString;
    var galleryLinkString;
    var statusBadgeString;
    if (galleryInfo.galleryStatus === 'online') {
      marqueeImageString = '<a href="' + galleryInfo.galleryUrl + '" target="_blank"><img src="' + galleryInfo.marqueeImageLocation + '" lightbox="' + galleryInfo.marqueeImageHasLightbox + '" /></a>';
      galleryLinkString = '<p><strong><a href="' + galleryInfo.galleryUrl + '" target="_blank">' + galleryInfo.galleryUrlAppearance + '</a></strong></p>';
      statusBadgeString = buildGalleryStatusBadge('88', '44', '#4c1', galleryInfo.galleryStatus, '65');
    } else {
      marqueeImageString = '<img src="' + galleryInfo.marqueeImageLocation + '" lightbox="' + galleryInfo.marqueeImageHasLightbox + '" />';
      galleryLinkString = '';
      if (galleryInfo.galleryStatus === 'offline') {
        statusBadgeString = buildGalleryStatusBadge('89', '45', '#e05d44', galleryInfo.galleryStatus, '65.5');
      } else if (galleryInfo.galleryStatus === 'mock-up') {
        statusBadgeString = buildGalleryStatusBadge('99', '55', '#dfb317', galleryInfo.galleryStatus, '70.5');
      }
    }
    return {
      marqueeImage: marqueeImageString,
      galleryLink: galleryLinkString,
      statusBadge: statusBadgeString
    };
  };
  var buildMainGallery = function(galleryName, galleryInfo) {
    var mainGalleryConditionalStrings = setMainGalleryConditions(galleryInfo);
    var marqueeImage = mainGalleryConditionalStrings.marqueeImage;
    var galleryTitle = '<h2 class="hyphenate">' + galleryInfo.galleryTitle + '</h2>';
    var galleryLink = mainGalleryConditionalStrings.galleryLink;
    var galleryStatusBadge = mainGalleryConditionalStrings.statusBadge;
    var galleryDescription = '<p>' + galleryInfo.galleryDescription + '</p>';
    return '<section id="' + galleryName + '" class="fadeOut content sub gallery"><nav><button class="gallery-control previous" disabled="disabled"></button><button class="gallery-control next"></button></nav><div class="slide first" style="left:0%;"><div class="gallery-panel marquee"><div class="marquee-image">' + marqueeImage + '</div><div class="gallery-title">' + galleryTitle + '</div><div class="gallery-url">' + galleryLink + '</div><div class="gallery-status">' + galleryStatusBadge + '</div><div class="gallery-description">' + galleryDescription + '</div></div></div>';
  };
  var buildAdditionalGalleries = function(galleryInfo) {
    var additionalGalleries = galleryInfo.additionalGalleries;
    var additionalGalleriesString = '';
    for (var i = 0; i < additionalGalleries.length; i++) {
      var currentGallery = additionalGalleries[i];
      var galleryHasLightbox = currentGallery.hasLightbox;
      var additionalClasses = currentGallery.additionalClasses;
      var galleryImageLocation = currentGallery.imageLocation;
      var galleryImageDescription = currentGallery.imageDescription;
      var galleryStartingPosition = (i + 1) * 100 + '%';
      if ((i + 1) !== additionalGalleries.length) {
        additionalGalleriesString += '<div class="slide" ';
      } else {
        additionalGalleriesString += '<div class="slide last" ';
      }
       additionalGalleriesString += 'style="left: ' + galleryStartingPosition + ';"><div class="gallery-panel repeat ' + additionalClasses + '"><div class="gallery-image"><img src="' + galleryImageLocation + '" lightbox="' + galleryHasLightbox + '" /></div><div class="gallery-text"><p>' + galleryImageDescription + '</p></div></div></div>';
    }
    additionalGalleriesString += '</section>';
    return additionalGalleriesString;
  };
  var buildNewGallery = function(galleryName) {
    var galleryInfo = retrieveGalleryInfo(galleryName);
    var mainGallery = buildMainGallery(galleryName, galleryInfo);
    var additionalGalleries = buildAdditionalGalleries(galleryInfo);
    var fullGallery = mainGallery + additionalGalleries;
    addGalleryToCache(galleryName, fullGallery);
    return fullGallery;
  };

  Gallery.loadGallery = function(galleryName) {
    var galleryString = '';
    var galleryInCache = checkForGalleryInCache(galleryName);
    if (galleryInCache) {
      galleryString = retrieveGalleryFromCache(galleryName);
    } else {
      galleryString = buildNewGallery(galleryName);
    }
    return galleryString;
  };

  var $guts = $('#guts');
  var galleryCache = {};

}(jQuery, window.Gallery = window.Gallery || {}));