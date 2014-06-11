var unsupportedFeatures = [];
var fullFeatureNameMap = {
  js: "JavaScript",
  flexbox: "CSS Flex-Box",
  flexboxlegacy: "Legacy CSS Flex-Box",
  hashchange: "Hashchange Event",
  backgroundsize: "CSS Background-Size",
  borderradius: "CSS Border-Radius",
  boxshadow: "CSS Box-Shadow",
  opacity: "CSS Opacity",
  cssanimations: "CSS Animations",
  csstransforms: "CSS Transforms",
  csstransitions: "CSS Transitions",
  fontface: "@font-face",
  sessiomstorage: "JavaScript Session Storage",
  boxsizing: "CSS Box-Sizing",
  mediaqueries: "@media Queries",
  lastchild: "CSS :last-child Selector",
  apng: ".apng File Type",
  websqldatabase: "Web SQL Database"
};
var classNames = $("html").attr("class").split(/\s+/);
$.each(classNames, function (e, t) {
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
  $(".chrome-link").html('<img src="img/icons/chrome.png" />');
  $(".firefox-link").html('<img src="img/icons/firefox.png" />');
  $(".safari-link").html('<img src="img/icons/safari.png" />');
  $(".opera-link").html('<img src="img/icons/opera.png" />');
  $("#browsehappy").show();
}