/* jshint undef: false */

(function($, FeatureTest, undefined) {
  'use strict';

  var unsupportedFeatures = [];
  var fullFeatureNameMap = {
    // apng: '.apng File Type',  // this is a test
    backgroundsize: 'CSS Background-Size',
    // battery: 'Battery API',  // this is also a test
    borderradius: 'CSS Border-Radius',
    boxshadow: 'CSS Box-Shadow',
    boxsizing: 'CSS Box-Sizing',
    // contextmenu: 'HTML5 Context Menus',  // also a test, supported in Firefox
    csstransforms2d: 'CSS 2D Transforms',
    csstransforms3d: 'CSS 3D Transforms',
    cssanimations: 'CSS Animations',
    // csspositionsticky: 'CSS Position: Sticky;',  // test
    csstransitions: 'CSS Transitions',
    flexbox: 'CSS Flex-Box',
    fontface: 'CSS @font-face',
    hashchange: 'JavaScript Hashchange Event',
    js: 'JavaScript',
    lastchild: 'CSS :last-child Selector',
    mediaqueries: 'CSS @media Queries',
    opacity: 'CSS Opacity',
    sessionstorage: 'JavaScript Session Storage'
  };

  var allClasses = $('html').attr('class').split(/\s+/);

  $.each(allClasses, function (e, t) {
    if (t.substring(0, 3) === 'no-') {
      unsupportedFeatures.push(fullFeatureNameMap[t.substring(3)]);
    }
  });

  if (unsupportedFeatures.length > 0) {
    var li = '';
    var featureNames = '';
    $.each(unsupportedFeatures, function (e, t) {
      featureNames += '-' + t + '-  ';
      li += '<li>' + t + '</li>';
    });
    var noSupportModal = '<div id="no-support"><div class="no-support-inner"><div class="no-support-text"><h2 class="no-support-header">You are using an outdated browser!</h2><p class="unsupported-features-lead-in">The following features are unsupported or turned off:</p><ul id="unsupported-features">' + li + '</ul><p>and they may have robbed you of what might have been arguably your most exciting experience on the Internet to date. <i>(It\'s also possible you\'re using Safari (or Mobile Safari) and have private browsing enabled. Turning off private browsing and reloading should fix everything.)</i></p><p>A list of today\'s most fabulous and exciting browsers can be found below.</p></div><div class="no-support-downloads"><span class="download chrome"><a href="https://www.google.com/chrome/browser/" target="_blank"><img src="images/icons/browser/chrome.png" /></a><em>Google Chrome</em></span><span class="download firefox"><a href="https://www.mozilla.org/en-US/firefox/new/?utm_source=firefox-com&utm_medium=referral" target="_blank"><img src="images/icons/browser/firefox.png" /></a><em>Mozilla Firefox</em></span><span class="download safari"><a href="http://www.apple.com/safari/" target="_blank"><img src="images/icons/browser/safari.png" /></a><em>Apple Safari</em></span><span class="download opera"><a href="http://www.opera.com/" target="_blank"><img src="images/icons/browser/opera.png" /></a><em>Opera... Opera</em></span></div></div></div><style>html,body{height:100%;overflow-y:hidden;}</style>';
    $('body').append(noSupportModal);
    $('#no-support').show();
    ga('send', 'event', 'Compatibility', 'Load', 'Unsupported Browser: ' + featureNames);
  }
}(jQuery, window.FeatureTest = window.FeatureTest || {}));
