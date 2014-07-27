(function($, Preload, undefined) {

  var isMobile = function() {
    if ($('.nav-toggle').is(':visible')) {
      return true;
    } else {
      return false;
    }
  };
  var gatherImageLocations = function() {
    var imageLocationsArray = [];
    for (var gallery in Resources.galleryInfo) {
      var galleryObject = Resources.galleryInfo[gallery];
      var marqueeImageLocation = galleryObject.marqueeImageLocation;
      var additionalGalleriesArray = galleryObject.additionalGalleries;
      imageLocationsArray.push(marqueeImageLocation);
      for (var i in additionalGalleriesArray) {
        var galleryItem = additionalGalleriesArray[i];
        var galleryItemImageLocation = galleryItem.imageLocation;
        imageLocationsArray.push(galleryItemImageLocation);
      }
    }
    return imageLocationsArray;
  };
  var buildImageObjects = function(imageLocations) {
    var images = [];
    for (i = 0; i < imageLocations.length; i++) {
      images[i] = new Image();
      images[i].src = imageLocations[i];
    }
  };
  var preLoadImages = function() {
    var imageLocations = gatherImageLocations();
    buildImageObjects(imageLocations);
  };
  var bindOnLoadEvents = function() {
    $(window).load(function() {
      if (!isMobile()) {
        preLoadImages();
      }
    });
  };

  Preload.init = function() {
    bindOnLoadEvents();
  };

}(jQuery, window.Preload = window.Preload || {}));