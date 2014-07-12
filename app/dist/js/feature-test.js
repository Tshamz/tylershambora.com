// If one version of flexbox works while the other doesn't, you'll receive a false negative
// If this is the case, detected it before everything else and correct it before proceeding
$('html.flexbox.no-flexboxlegacy, html.no-flexbox.flexboxlegacy').removeClass('no-flexbox no-flexboxlegacy');

var unsupportedFeatures = [];
var fullFeatureNameMap = {
  js: "JavaScript",
  flexbox: "CSS Flex-Box",
  flexboxlegacy: "Legacy CSS Flex-Box",
  hashchange: "JavaScript Hashchange Event",
  backgroundsize: "CSS Background-Size",
  borderradius: "CSS Border-Radius",
  boxshadow: "CSS Box-Shadow",
  opacity: "CSS Opacity",
  cssanimations: "CSS Animations",
  csstransforms: "CSS Transforms",
  csstransitions: "CSS Transitions",
  fontface: "CSS @font-face",
  sessionstorage: "JavaScript Session Storage",
  boxsizing: "CSS Box-Sizing",
  mediaqueries: "CSS @media Queries",
  lastchild: "CSS :last-child Selector",
  apng: ".apng File Type",
  websqldatabase: "Web SQL Database"
};

var allClasses = $("html").attr("class").split(/\s+/);

$.each(allClasses, function (e, t) {
  if (t.substring(0, 3) === "no-") {
    unsupportedFeatures.push(fullFeatureNameMap[t.substring(3)]);
  }
});

if (unsupportedFeatures.length > 0) {
  var n = "";
  $.each(unsupportedFeatures, function (e, t) {
    n = n + "<li>" + t + "</li>";
  });
  $("#unsupported-features").append(n);
  $(".download-chrome a").html('<img src="img/icons/chrome.png" />');
  $(".download-firefox a").html('<img src="img/icons/firefox.png" />');
  $(".download-safari a").html('<img src="img/icons/safari.png" />');
  $(".download-opera a").html('<img src="img/icons/opera.png" />');
  $("#no-support").show();
}