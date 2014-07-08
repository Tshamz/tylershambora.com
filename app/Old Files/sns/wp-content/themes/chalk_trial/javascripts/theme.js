/* flexslider.min.js
 * Responsive image slider
 * ------------------------------------------------------------------ */

/*
 * jQuery FlexSlider v1.7
 * http://flex.madebymufffin.com
 * Copyright 2011, Tyler Smith
 * Free to use under the MIT license.
 */

(function(a){a.flexslider=function(c,b){var d=c;d.init=function(){d.vars=a.extend({},a.flexslider.defaults,b);d.data("flexslider",true);d.container=a(".slides",d);d.slides=a(".slides > li",d);d.count=d.slides.length;d.animating=false;d.currentSlide=d.vars.slideToStart;d.animatingTo=d.currentSlide;d.atEnd=(d.currentSlide==0)?true:false;d.eventType=("ontouchstart" in document.documentElement)?"touchstart":"click";d.cloneCount=0;d.cloneOffset=0;if(d.vars.controlsContainer!=""){d.controlsContainer=a(d.vars.controlsContainer).eq(a(".slides").index(d.container));d.containerExists=d.controlsContainer.length>0}if(d.vars.manualControls!=""){d.manualControls=a(d.vars.manualControls,((d.containerExists)?d.controlsContainer:d));d.manualExists=d.manualControls.length>0}if(d.vars.randomize){d.slides.sort(function(){return(Math.round(Math.random())-0.5)});d.container.empty().append(d.slides)}if(d.vars.animation.toLowerCase()=="slide"){d.css({overflow:"hidden"});if(d.vars.animationLoop){d.cloneCount=2;d.cloneOffset=1;d.container.append(d.slides.filter(":first").clone().addClass("clone")).prepend(d.slides.filter(":last").clone().addClass("clone"))}d.container.width(((d.count+d.cloneCount)*d.width())+2000);d.newSlides=a(".slides > li",d);setTimeout(function(){d.newSlides.width(d.width()).css({"float":"left"}).show()},100);d.container.css({marginLeft:(-1*(d.currentSlide+d.cloneOffset))*d.width()+"px"})}else{d.slides.css({width:"100%","float":"left",marginRight:"-100%"}).eq(d.currentSlide).fadeIn(400)}if(d.vars.controlNav){if(d.manualExists){d.controlNav=d.manualControls}else{var g=a('<ol class="flex-control-nav"></ol>');var k=1;for(var l=0;l<d.count;l++){g.append("<li><a>"+k+"</a></li>");k++}if(d.containerExists){a(d.controlsContainer).append(g);d.controlNav=a(".flex-control-nav li a",d.controlsContainer)}else{d.append(g);d.controlNav=a(".flex-control-nav li a",d)}}d.controlNav.eq(d.currentSlide).addClass("active");d.controlNav.bind(d.eventType,function(i){i.preventDefault();if(!a(this).hasClass("active")){d.flexAnimate(d.controlNav.index(a(this)),d.vars.pauseOnAction)}})}if(d.vars.directionNav){var f=a('<ul class="flex-direction-nav"><li><a class="prev" href="#">'+d.vars.prevText+'</a></li><li><a class="next" href="#">'+d.vars.nextText+"</a></li></ul>");if(d.containerExists){a(d.controlsContainer).append(f);d.directionNav=a(".flex-direction-nav li a",d.controlsContainer)}else{d.append(f);d.directionNav=a(".flex-direction-nav li a",d)}if(!d.vars.animationLoop){if(d.currentSlide==0){d.directionNav.filter(".prev").addClass("disabled")}else{if(d.currentSlide==d.count-1){d.directionNav.filter(".next").addClass("disabled")}}}d.directionNav.bind(d.eventType,function(i){i.preventDefault();var j=(a(this).hasClass("next"))?d.getTarget("next"):d.getTarget("prev");if(d.canAdvance(j)){d.flexAnimate(j,d.vars.pauseOnAction)}})}if(d.vars.keyboardNav&&a("ul.slides").length==1){a(document).keyup(function(i){if(d.animating){return}else{if(i.keyCode!=39&&i.keyCode!=37){return}else{if(i.keyCode==39){var j=d.getTarget("next")}else{if(i.keyCode==37){var j=d.getTarget("prev")}}if(d.canAdvance(j)){d.flexAnimate(j,d.vars.pauseOnAction)}}}})}if(d.vars.slideshow){if(d.vars.pauseOnHover&&d.vars.slideshow){d.hover(function(){d.pause()},function(){d.resume()})}d.animatedSlides=setInterval(d.animateSlides,d.vars.slideshowSpeed)}if(d.vars.pausePlay){var e=a('<div class="flex-pauseplay"><span></span></div>');if(d.containerExists){d.controlsContainer.append(e);d.pausePlay=a(".flex-pauseplay span",d.controlsContainer)}else{d.append(e);d.pausePlay=a(".flex-pauseplay span",d)}var h=(d.vars.slideshow)?"pause":"play";d.pausePlay.addClass(h).text((h=="pause")?d.vars.pauseText:d.vars.playText);d.pausePlay.click(function(i){i.preventDefault();(a(this).hasClass("pause"))?d.pause():d.resume()})}if(d.vars.touchSwipe&&"ontouchstart" in document.documentElement){d.each(function(){var i,j=20;isMoving=false;function o(){this.removeEventListener("touchmove",m);i=null;isMoving=false}function m(s){if(isMoving){var p=s.touches[0].pageX,q=i-p;if(Math.abs(q)>=j){o();var r=(q>0)?d.getTarget("next"):d.getTarget("prev");if(d.canAdvance(r)){d.flexAnimate(r,d.vars.pauseOnAction)}}}}function n(p){if(p.touches.length==1){i=p.touches[0].pageX;isMoving=true;this.addEventListener("touchmove",m,false)}}if("ontouchstart" in document.documentElement){this.addEventListener("touchstart",n,false)}})}if(d.vars.animation.toLowerCase()=="slide"){d.sliderTimer;a(window).resize(function(){d.newSlides.width(d.width());d.container.width(((d.count+d.cloneCount)*d.width())+2000);clearTimeout(d.sliderTimer);d.sliderTimer=setTimeout(function(){d.flexAnimate(d.currentSlide)},300)})}d.vars.start(d)};d.flexAnimate=function(f,e){if(!d.animating){d.animating=true;d.animatingTo=f;d.vars.before(d);if(e){d.pause()}if(d.vars.controlNav){d.controlNav.removeClass("active").eq(f).addClass("active")}d.atEnd=(f==0||f==d.count-1)?true:false;if(!d.vars.animationLoop&&d.vars.directionNav){if(f==0){d.directionNav.removeClass("disabled").filter(".prev").addClass("disabled")}else{if(f==d.count-1){d.directionNav.removeClass("disabled").filter(".next").addClass("disabled")}else{d.directionNav.removeClass("disabled")}}}if(!d.vars.animationLoop&&f==d.count-1){d.pause();d.vars.end(d)}if(d.vars.animation.toLowerCase()=="slide"){if(d.currentSlide==0&&f==d.count-1&&d.vars.animationLoop){d.slideString="0px"}else{if(d.currentSlide==d.count-1&&f==0&&d.vars.animationLoop){d.slideString=(-1*(d.count+1))*d.slides.filter(":first").width()+"px"}else{d.slideString=(-1*(f+d.cloneOffset))*d.slides.filter(":first").width()+"px"}}d.container.animate({marginLeft:d.slideString},d.vars.animationDuration,function(){if(d.currentSlide==0&&f==d.count-1&&d.vars.animationLoop){d.container.css({marginLeft:(-1*d.count)*d.slides.filter(":first").width()+"px"})}else{if(d.currentSlide==d.count-1&&f==0&&d.vars.animationLoop){d.container.css({marginLeft:-1*d.slides.filter(":first").width()+"px"})}}d.animating=false;d.currentSlide=f;d.vars.after(d)})}else{d.slides.eq(d.currentSlide).fadeOut(d.vars.animationDuration);d.slides.eq(f).fadeIn(d.vars.animationDuration,function(){d.animating=false;d.currentSlide=f;d.vars.after(d)})}}};d.animateSlides=function(){if(!d.animating){var e=(d.currentSlide==d.count-1)?0:d.currentSlide+1;d.flexAnimate(e)}};d.pause=function(){clearInterval(d.animatedSlides);if(d.vars.pausePlay){d.pausePlay.removeClass("pause").addClass("play").text(d.vars.playText)}};d.resume=function(){d.animatedSlides=setInterval(d.animateSlides,d.vars.slideshowSpeed);if(d.vars.pausePlay){d.pausePlay.removeClass("play").addClass("pause").text(d.vars.pauseText)}};d.canAdvance=function(e){if(!d.vars.animationLoop&&d.atEnd){if(d.currentSlide==0&&e==d.count-1&&d.direction!="next"){return false}else{if(d.currentSlide==d.count-1&&e==0&&d.direction=="next"){return false}else{return true}}}else{return true}};d.getTarget=function(e){d.direction=e;if(e=="next"){return(d.currentSlide==d.count-1)?0:d.currentSlide+1}else{return(d.currentSlide==0)?d.count-1:d.currentSlide-1}};d.init()};a.flexslider.defaults={animation:"fade",slideshow:true,slideshowSpeed:7000,animationDuration:600,directionNav:true,controlNav:true,keyboardNav:true,touchSwipe:true,prevText:"Previous",nextText:"Next",pausePlay:false,pauseText:"Pause",playText:"Play",randomize:false,slideToStart:0,animationLoop:true,pauseOnAction:true,pauseOnHover:false,controlsContainer:"",manualControls:"",start:function(){},before:function(){},after:function(){},end:function(){}};a.fn.flexslider=function(b){return this.each(function(){if(a(this).find(".slides li").length==1){a(this).find(".slides li").fadeIn(400)}else{if(a(this).data("flexslider")!=true){new a.flexslider(a(this),b)}}})}})(jQuery);
/*global jQuery */
/*! 
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/


(function( $ ){

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    }
    
    var div = document.createElement('div'),
        ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];
        
  	div.className = 'fit-vids-style';
    div.innerHTML = '&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';
                      
    ref.parentNode.insertBefore(div,ref);
    
    if ( options ) { 
      $.extend( settings, options );
    }
    
    return this.each(function(){
      var selectors = [
        "iframe[src^='http://player.vimeo.com']", 
        "iframe[src^='http://www.youtube.com']", 
        "iframe[src^='http://www.kickstarter.com']", 
        "object", 
        "embed"
      ];
      
      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }
      
      var $allVideos = $(this).find(selectors.join(','));

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() == 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; } 
        var height = this.tagName.toLowerCase() == 'object' ? $this.attr('height') : $this.height(),
            aspectRatio = height / $this.width();
		if(!$this.attr('id')){
			var videoID = 'fitvid' + Math.floor(Math.random()*999999);
			$this.attr('id', videoID);
		}
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  
  }
})( jQuery );
/** @license
 *
 * SoundManager 2: JavaScript Sound for the Web
 * ----------------------------------------------
 * http://schillmania.com/projects/soundmanager2/
 *
 * Copyright (c) 2007, Scott Schiller. All rights reserved.
 * Code provided under the BSD License:
 * http://schillmania.com/projects/soundmanager2/license.txt
 *
 * V2.97a.20110918
 */

/*global window, SM2_DEFER, sm2Debugger, console, document, navigator, setTimeout, setInterval, clearInterval, Audio */
/* jslint regexp: true, sloppy: true, white: true, nomen: true, plusplus: true */


(function(window) {
var soundManager = null;
function SoundManager(smURL, smID) {
  this.flashVersion = 8;
  this.debugMode = false;
  this.debugFlash = false;
  this.useConsole = true;
  this.consoleOnly = false;
  this.waitForWindowLoad = false;
  this.bgColor = '#ffffff';
  this.useHighPerformance = false;
  this.flashPollingInterval = null;
  this.flashLoadTimeout = 1000;
  this.wmode = null;
  this.allowScriptAccess = 'always';
  this.useFlashBlock = false;
  this.useHTML5Audio = true;
  this.html5Test = /^(probably|maybe)$/i;
  this.preferFlash = true;
  this.audioFormats = {
    'mp3': {
      'type': ['audio/mpeg; codecs="mp3"', 'audio/mpeg', 'audio/mp3', 'audio/MPA', 'audio/mpa-robust'],
      'required': true
    },
    'mp4': {
      'related': ['aac','m4a'],
      'type': ['audio/mp4; codecs="mp4a.40.2"', 'audio/aac', 'audio/x-m4a', 'audio/MP4A-LATM', 'audio/mpeg4-generic'],
      'required': false
    },
    'ogg': {
      'type': ['audio/ogg; codecs=vorbis'],
      'required': false
    },
    'wav': {
      'type': ['audio/wav; codecs="1"', 'audio/wav', 'audio/wave', 'audio/x-wav'],
      'required': false
    }
  };
  this.defaultOptions = {
    'autoLoad': false,
    'stream': true,
    'autoPlay': false,
    'loops': 1,
    'onid3': null,
    'onload': null,
    'whileloading': null,
    'onplay': null,
    'onpause': null,
    'onresume': null,
    'whileplaying': null,
    'onstop': null,
    'onfailure': null,
    'onfinish': null,
    'multiShot': true,
    'multiShotEvents': false,
    'position': null,
    'pan': 0,
    'type': null,
    'usePolicyFile': false,
    'volume': 100
  };
  this.flash9Options = {
    'isMovieStar': null,
    'usePeakData': false,
    'useWaveformData': false,
    'useEQData': false,
    'onbufferchange': null,
    'ondataerror': null
  };
  this.movieStarOptions = {
    'bufferTime': 3,
    'serverURL': null,
    'onconnect': null,
    'duration': null
  };
  this.movieID = 'sm2-container';
  this.id = (smID || 'sm2movie');
  this.swfCSS = {
    'swfBox': 'sm2-object-box',
    'swfDefault': 'movieContainer',
    'swfError': 'swf_error',
    'swfTimedout': 'swf_timedout',
    'swfLoaded': 'swf_loaded',
    'swfUnblocked': 'swf_unblocked',
    'sm2Debug': 'sm2_debug',
    'highPerf': 'high_performance',
    'flashDebug': 'flash_debug'
  };
  this.debugID = 'soundmanager-debug';
  this.debugURLParam = /([#?&])debug=1/i;
  this.versionNumber = 'V2.97a.20110918';
  this.version = null;
  this.movieURL = null;
  this.url = (smURL || null);
  this.altURL = null;
  this.swfLoaded = false;
  this.enabled = false;
  this.o = null;
  this.oMC = null;
  this.sounds = {};
  this.soundIDs = [];
  this.muted = false;
  this.specialWmodeCase = false;
  this.didFlashBlock = false;
  this.filePattern = null;
  this.filePatterns = {
    'flash8': /\.mp3(\?.*)?$/i,
    'flash9': /\.mp3(\?.*)?$/i
  };
  this.features = {
    'buffering': false,
    'peakData': false,
    'waveformData': false,
    'eqData': false,
    'movieStar': false
  };
  this.sandbox = {
  };
  this.hasHTML5 = (typeof Audio !== 'undefined' && typeof new Audio().canPlayType !== 'undefined');
  this.html5 = {
    'usingFlash': null
  };
  this.flash = {};
  this.html5Only = false;
  this.ignoreFlash = false;
  var SMSound,
  _s = this, _sm = 'soundManager', _smc = _sm+'::', _h5 = 'HTML5::', _id, _ua = navigator.userAgent, _win = window, _wl = _win.location.href.toString(), _doc = document, _doNothing, _init, _fV, _on_queue = [], _debugOpen = true, _debugTS, _didAppend = false, _appendSuccess = false, _didInit = false, _disabled = false, _windowLoaded = false, _wDS, _wdCount = 0, _initComplete, _mixin, _addOnEvent, _processOnEvents, _initUserOnload, _delayWaitForEI, _waitForEI, _setVersionInfo, _handleFocus, _strings, _initMovie, _domContentLoaded, _didDCLoaded, _getDocument, _createMovie, _catchError, _setPolling, _initDebug, _debugLevels = ['log', 'info', 'warn', 'error'], _defaultFlashVersion = 8, _disableObject, _failSafely, _normalizeMovieURL, _oRemoved = null, _oRemovedHTML = null, _str, _flashBlockHandler, _getSWFCSS, _toggleDebug, _loopFix, _policyFix, _complain, _idCheck, _waitingForEI = false, _initPending = false, _smTimer, _onTimer, _startTimer, _stopTimer, _needsFlash = null, _featureCheck, _html5OK, _html5CanPlay, _html5Ext, _html5Unload, _domContentLoadedIE, _testHTML5, _event, _slice = Array.prototype.slice, _useGlobalHTML5Audio = false, _hasFlash, _detectFlash, _badSafariFix, _html5_events, _showSupport,
  _is_iDevice = _ua.match(/(ipad|iphone|ipod)/i), _likesHTML5 = (_ua.match(/(mobile|pre\/|xoom)/i) || _is_iDevice), _isIE = _ua.match(/msie/i), _isWebkit = _ua.match(/webkit/i), _isSafari = (_ua.match(/safari/i) && !_ua.match(/chrome/i)), _isOpera = (_ua.match(/opera/i)),
  _isBadSafari = (!_wl.match(/usehtml5audio/i) && !_wl.match(/sm2\-ignorebadua/i) && _isSafari && _ua.match(/OS X 10_6_([3-7])/i)),
  _hasConsole = (typeof console !== 'undefined' && typeof console.log !== 'undefined'), _isFocused = (typeof _doc.hasFocus !== 'undefined'?_doc.hasFocus():null), _tryInitOnFocus = (_isSafari && typeof _doc.hasFocus === 'undefined'), _okToDisable = !_tryInitOnFocus, _flashMIME = /(mp3|mp4|mpa)/i,
  _emptyURL = 'about:blank',
  _overHTTP = (_doc.location?_doc.location.protocol.match(/http/i):null),
  _http = (!_overHTTP ? 'http:/'+'/' : ''),
  _netStreamMimeTypes = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|mp4v|3gp|3g2)\s*(?:$|;)/i,
  _netStreamTypes = ['mpeg4', 'aac', 'flv', 'mov', 'mp4', 'm4v', 'f4v', 'm4a', 'mp4v', '3gp', '3g2'],
  _netStreamPattern = new RegExp('\\.(' + _netStreamTypes.join('|') + ')(\\?.*)?$', 'i');
  this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
  this.useAltURL = !_overHTTP;
  this._global_a = null;
  if (_likesHTML5) {
    _s.useHTML5Audio = true;
    _s.preferFlash = false;
    if (_is_iDevice) {
      _s.ignoreFlash = true;
      _useGlobalHTML5Audio = true;
    }
  }
  this.ok = function() {
    return (_needsFlash?(_didInit && !_disabled):(_s.useHTML5Audio && _s.hasHTML5));
  };
  this.supported = this.ok;
  this.getMovie = function(smID) {
    return _id(smID) || _doc[smID] || _win[smID];
  };
  this.createSound = function(oOptions) {
    var _cs = _sm+'.createSound(): ',
    thisOptions = null, oSound = null, _tO = null;
    if (!_didInit || !_s.ok()) {
      _complain(_cs + _str(!_didInit?'notReady':'notOK'));
      return false;
    }
    if (arguments.length === 2) {
      oOptions = {
        'id': arguments[0],
        'url': arguments[1]
      };
    }
    thisOptions = _mixin(oOptions);
    _tO = thisOptions;
    if (_idCheck(_tO.id, true)) {
      return _s.sounds[_tO.id];
    }
    function make() {
      thisOptions = _loopFix(thisOptions);
      _s.sounds[_tO.id] = new SMSound(_tO);
      _s.soundIDs.push(_tO.id);
      return _s.sounds[_tO.id];
    }
    if (_html5OK(_tO)) {
      oSound = make();
      oSound._setup_html5(_tO);
    } else {
      if (_fV > 8) {
        if (_tO.isMovieStar === null) {
          _tO.isMovieStar = (_tO.serverURL || (_tO.type ? _tO.type.match(_netStreamMimeTypes) : false) || _tO.url.match(_netStreamPattern));
        }
        if (_tO.isMovieStar) {
          if (_tO.usePeakData) {
            _tO.usePeakData = false;
          }
        }
      }
      _tO = _policyFix(_tO, _cs);
      oSound = make();
      if (_fV === 8) {
        _s.o._createSound(_tO.id, _tO.loops||1, _tO.usePolicyFile);
      } else {
        _s.o._createSound(_tO.id, _tO.url, _tO.usePeakData, _tO.useWaveformData, _tO.useEQData, _tO.isMovieStar, (_tO.isMovieStar?_tO.bufferTime:false), _tO.loops||1, _tO.serverURL, _tO.duration||null, _tO.autoPlay, true, _tO.autoLoad, _tO.usePolicyFile);
        if (!_tO.serverURL) {
          oSound.connected = true;
          if (_tO.onconnect) {
            _tO.onconnect.apply(oSound);
          }
        }
      }
      if (!_tO.serverURL && (_tO.autoLoad || _tO.autoPlay)) {
        oSound.load(_tO);
      }
    }
    if (!_tO.serverURL && _tO.autoPlay) {
      oSound.play();
    }
    return oSound;
  };
  this.destroySound = function(sID, _bFromSound) {
    if (!_idCheck(sID)) {
      return false;
    }
    var oS = _s.sounds[sID], i;
    oS._iO = {};
    oS.stop();
    oS.unload();
    for (i = 0; i < _s.soundIDs.length; i++) {
      if (_s.soundIDs[i] === sID) {
        _s.soundIDs.splice(i, 1);
        break;
      }
    }
    if (!_bFromSound) {
      oS.destruct(true);
    }
    oS = null;
    delete _s.sounds[sID];
    return true;
  };
  this.load = function(sID, oOptions) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].load(oOptions);
  };
  this.unload = function(sID) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].unload();
  };
  this.onposition = function(sID, nPosition, oMethod, oScope) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].onposition(nPosition, oMethod, oScope);
  };
  this.play = function(sID, oOptions) {
    var fN = _sm+'.play(): ';
    if (!_didInit || !_s.ok()) {
      _complain(fN + _str(!_didInit?'notReady':'notOK'));
      return false;
    }
    if (!_idCheck(sID)) {
      if (!(oOptions instanceof Object)) {
        oOptions = {
          url: oOptions
        };
      }
      if (oOptions && oOptions.url) {
        oOptions.id = sID;
        return _s.createSound(oOptions).play();
      } else {
        return false;
      }
    }
    return _s.sounds[sID].play(oOptions);
  };
  this.start = this.play;
  this.setPosition = function(sID, nMsecOffset) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].setPosition(nMsecOffset);
  };
  this.stop = function(sID) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].stop();
  };
  this.stopAll = function() {
    var oSound;
    for (oSound in _s.sounds) {
      if (_s.sounds.hasOwnProperty(oSound)) {
        _s.sounds[oSound].stop();
      }
    }
  };
  this.pause = function(sID) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].pause();
  };
  this.pauseAll = function() {
    var i;
    for (i = _s.soundIDs.length; i--;) {
      _s.sounds[_s.soundIDs[i]].pause();
    }
  };
  this.resume = function(sID) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].resume();
  };
  this.resumeAll = function() {
    var i;
    for (i = _s.soundIDs.length; i--;) {
      _s.sounds[_s.soundIDs[i]].resume();
    }
  };
  this.togglePause = function(sID) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].togglePause();
  };
  this.setPan = function(sID, nPan) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].setPan(nPan);
  };
  this.setVolume = function(sID, nVol) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].setVolume(nVol);
  };
  this.mute = function(sID) {
    var fN = _sm+'.mute(): ',
    i = 0;
    if (typeof sID !== 'string') {
      sID = null;
    }
    if (!sID) {
      for (i = _s.soundIDs.length; i--;) {
        _s.sounds[_s.soundIDs[i]].mute();
      }
      _s.muted = true;
    } else {
      if (!_idCheck(sID)) {
        return false;
      }
      return _s.sounds[sID].mute();
    }
    return true;
  };
  this.muteAll = function() {
    _s.mute();
  };
  this.unmute = function(sID) {
    var fN = _sm+'.unmute(): ', i;
    if (typeof sID !== 'string') {
      sID = null;
    }
    if (!sID) {
      for (i = _s.soundIDs.length; i--;) {
        _s.sounds[_s.soundIDs[i]].unmute();
      }
      _s.muted = false;
    } else {
      if (!_idCheck(sID)) {
        return false;
      }
      return _s.sounds[sID].unmute();
    }
    return true;
  };
  this.unmuteAll = function() {
    _s.unmute();
  };
  this.toggleMute = function(sID) {
    if (!_idCheck(sID)) {
      return false;
    }
    return _s.sounds[sID].toggleMute();
  };
  this.getMemoryUse = function() {
    var ram = 0;
    if (_s.o && _fV !== 8) {
      ram = parseInt(_s.o._getMemoryUse(), 10);
    }
    return ram;
  };
  this.disable = function(bNoDisable) {
    var i;
    if (typeof bNoDisable === 'undefined') {
      bNoDisable = false;
    }
    if (_disabled) {
      return false;
    }
    _disabled = true;
    for (i = _s.soundIDs.length; i--;) {
      _disableObject(_s.sounds[_s.soundIDs[i]]);
    }
    _initComplete(bNoDisable);
    _event.remove(_win, 'load', _initUserOnload);
    return true;
  };
  this.canPlayMIME = function(sMIME) {
    var result;
    if (_s.hasHTML5) {
      result = _html5CanPlay({type:sMIME});
    }
    if (!_needsFlash || result) {
      return result;
    } else {
      return (sMIME ? !!((_fV > 8 ? sMIME.match(_netStreamMimeTypes) : null) || sMIME.match(_s.mimePattern)) : null);
    }
  };
  this.canPlayURL = function(sURL) {
    var result;
    if (_s.hasHTML5) {
      result = _html5CanPlay({url: sURL});
    }
    if (!_needsFlash || result) {
      return result;
    } else {
      return (sURL ? !!(sURL.match(_s.filePattern)) : null);
    }
  };
  this.canPlayLink = function(oLink) {
    if (typeof oLink.type !== 'undefined' && oLink.type) {
      if (_s.canPlayMIME(oLink.type)) {
        return true;
      }
    }
    return _s.canPlayURL(oLink.href);
  };
  this.getSoundById = function(sID, _suppressDebug) {
    if (!sID) {
      throw new Error(_sm+'.getSoundById(): sID is null/undefined');
    }
    var result = _s.sounds[sID];
    return result;
  };
  this.onready = function(oMethod, oScope) {
    var sType = 'onready';
    if (oMethod && oMethod instanceof Function) {
      if (!oScope) {
        oScope = _win;
      }
      _addOnEvent(sType, oMethod, oScope);
      _processOnEvents();
      return true;
    } else {
      throw _str('needFunction', sType);
    }
  };
  this.ontimeout = function(oMethod, oScope) {
    var sType = 'ontimeout';
    if (oMethod && oMethod instanceof Function) {
      if (!oScope) {
        oScope = _win;
      }
      _addOnEvent(sType, oMethod, oScope);
      _processOnEvents({type:sType});
      return true;
    } else {
      throw _str('needFunction', sType);
    }
  };
  this._writeDebug = function(sText, sType, _bTimestamp) {
    return true;
  };
  this._wD = this._writeDebug;
  this._debug = function() {
  };
  this.reboot = function() {
    var i, j;
    for (i = _s.soundIDs.length; i--;) {
      _s.sounds[_s.soundIDs[i]].destruct();
    }
    try {
      if (_isIE) {
        _oRemovedHTML = _s.o.innerHTML;
      }
      _oRemoved = _s.o.parentNode.removeChild(_s.o);
    } catch(e) {
    }
    _oRemovedHTML = _oRemoved = _needsFlash = null;
    _s.enabled = _didDCLoaded = _didInit = _waitingForEI = _initPending = _didAppend = _appendSuccess = _disabled = _s.swfLoaded = false;
    _s.soundIDs = _s.sounds = [];
    _s.o = null;
    for (i in _on_queue) {
      if (_on_queue.hasOwnProperty(i)) {
        for (j = _on_queue[i].length; j--;) {
          _on_queue[i][j].fired = false;
        }
      }
    }
    _win.setTimeout(_s.beginDelayedInit, 20);
  };
  this.getMoviePercent = function() {
    return (_s.o && typeof _s.o.PercentLoaded !== 'undefined' ? _s.o.PercentLoaded() : null);
  };
  this.beginDelayedInit = function() {
    _windowLoaded = true;
    _domContentLoaded();
    setTimeout(function() {
      if (_initPending) {
        return false;
      }
      _createMovie();
      _initMovie();
      _initPending = true;
      return true;
    }, 20);
    _delayWaitForEI();
  };
  this.destruct = function() {
    _s.disable(true);
  };
  SMSound = function(oOptions) {
    var _t = this, _resetProperties, _stop_html5_timer, _start_html5_timer;
    this.sID = oOptions.id;
    this.url = oOptions.url;
    this.options = _mixin(oOptions);
    this.instanceOptions = this.options;
    this._iO = this.instanceOptions;
    this.pan = this.options.pan;
    this.volume = this.options.volume;
    this._lastURL = null;
    this.isHTML5 = false;
    this._a = null;
    this.id3 = {};
    this._debug = function() {
    };
    this.load = function(oOptions) {
      var oS = null;
      if (typeof oOptions !== 'undefined') {
        _t._iO = _mixin(oOptions, _t.options);
        _t.instanceOptions = _t._iO;
      } else {
        oOptions = _t.options;
        _t._iO = oOptions;
        _t.instanceOptions = _t._iO;
        if (_t._lastURL && _t._lastURL !== _t.url) {
          _t._iO.url = _t.url;
          _t.url = null;
        }
      }
      if (!_t._iO.url) {
        _t._iO.url = _t.url;
      }
      if (_t._iO.url === _t.url && _t.readyState !== 0 && _t.readyState !== 2) {
        return _t;
      }
      _t._lastURL = _t.url;
      _t.loaded = false;
      _t.readyState = 1;
      _t.playState = 0;
      if (_html5OK(_t._iO)) {
        oS = _t._setup_html5(_t._iO);
        if (!oS._called_load) {
          _t._html5_canplay = false;
          oS.load();
          oS._called_load = true;
          if (_t._iO.autoPlay) {
            _t.play();
          }
        } else {
        }
      } else {
        try {
          _t.isHTML5 = false;
          _t._iO = _policyFix(_loopFix(_t._iO));
          if (_fV === 8) {
            _s.o._load(_t.sID, _t._iO.url, _t._iO.stream, _t._iO.autoPlay, (_t._iO.whileloading?1:0), _t._iO.loops||1, _t._iO.usePolicyFile);
          } else {
            _s.o._load(_t.sID, _t._iO.url, !!(_t._iO.stream), !!(_t._iO.autoPlay), _t._iO.loops||1, !!(_t._iO.autoLoad), _t._iO.usePolicyFile);
          }
        } catch(e) {
          _catchError({type:'SMSOUND_LOAD_JS_EXCEPTION', fatal:true});
        }
      }
      return _t;
    };
    this.unload = function() {
      if (_t.readyState !== 0) {
        if (!_t.isHTML5) {
          if (_fV === 8) {
            _s.o._unload(_t.sID, _emptyURL);
          } else {
            _s.o._unload(_t.sID);
          }
        } else {
          _stop_html5_timer();
          if (_t._a) {
            _t._a.pause();
            _html5Unload(_t._a);
          }
        }
        _resetProperties();
      }
      return _t;
    };
    this.destruct = function(_bFromSM) {
      if (!_t.isHTML5) {
        _t._iO.onfailure = null;
        _s.o._destroySound(_t.sID);
      } else {
        _stop_html5_timer();
        if (_t._a) {
          _t._a.pause();
          _html5Unload(_t._a);
          if (!_useGlobalHTML5Audio) {
            _t._remove_html5_events();
          }
          _t._a._t = null;
          _t._a = null;
        }
      }
      if (!_bFromSM) {
        _s.destroySound(_t.sID, true);
      }
    };
    this.play = function(oOptions, _updatePlayState) {
      var fN = 'SMSound.play(): ', allowMulti, a;
      _updatePlayState = _updatePlayState === undefined ? true : _updatePlayState;
      if (!oOptions) {
        oOptions = {};
      }
      _t._iO = _mixin(oOptions, _t._iO);
      _t._iO = _mixin(_t._iO, _t.options);
      _t.instanceOptions = _t._iO;
      if (_t._iO.serverURL && !_t.connected) {
        if (!_t.getAutoPlay()) {
          _t.setAutoPlay(true);
        }
        return _t;
      }
      if (_html5OK(_t._iO)) {
        _t._setup_html5(_t._iO);
        _start_html5_timer();
      }
      if (_t.playState === 1 && !_t.paused) {
        allowMulti = _t._iO.multiShot;
        if (!allowMulti) {
          return _t;
        } else {
        }
      }
      if (!_t.loaded) {
        if (_t.readyState === 0) {
          if (!_t.isHTML5) {
            _t._iO.autoPlay = true;
          }
          _t.load(_t._iO);
        } else if (_t.readyState === 2) {
          return _t;
        } else {
        }
      } else {
      }
      if (!_t.isHTML5 && _fV === 9 && _t.position > 0 && _t.position === _t.duration) {
        _t._iO.position = 0;
      }
      if (_t.paused && _t.position && _t.position > 0) {
        _t.resume();
      } else {
        _t.playState = 1;
        _t.paused = false;
        if (!_t.instanceCount || _t._iO.multiShotEvents || (!_t.isHTML5 && _fV > 8 && !_t.getAutoPlay())) {
          _t.instanceCount++;
        }
        _t.position = (typeof _t._iO.position !== 'undefined' && !isNaN(_t._iO.position)?_t._iO.position:0);
        if (!_t.isHTML5) {
          _t._iO = _policyFix(_loopFix(_t._iO));
        }
        if (_t._iO.onplay && _updatePlayState) {
          _t._iO.onplay.apply(_t);
          _t._onplay_called = true;
        }
        _t.setVolume(_t._iO.volume, true);
        _t.setPan(_t._iO.pan, true);
        if (!_t.isHTML5) {
          _s.o._start(_t.sID, _t._iO.loops || 1, (_fV === 9?_t._iO.position:_t._iO.position / 1000));
        } else {
          _start_html5_timer();
          a = _t._setup_html5();
          _t.setPosition(_t._iO.position);
          a.play();
        }
      }
      return _t;
    };
    this.start = this.play;
    this.stop = function(bAll) {
      if (_t.playState === 1) {
        _t._onbufferchange(0);
        _t.resetOnPosition(0);
        _t.paused = false;
        if (!_t.isHTML5) {
          _t.playState = 0;
        }
        if (_t._iO.onstop) {
          _t._iO.onstop.apply(_t);
        }
        if (!_t.isHTML5) {
          _s.o._stop(_t.sID, bAll);
          if (_t._iO.serverURL) {
            _t.unload();
          }
        } else {
          if (_t._a) {
            _t.setPosition(0);
            _t._a.pause();
            _t.playState = 0;
            _t._onTimer();
            _stop_html5_timer();
          }
        }
        _t.instanceCount = 0;
        _t._iO = {};
      }
      return _t;
    };
    this.setAutoPlay = function(autoPlay) {
      _t._iO.autoPlay = autoPlay;
      if (!_t.isHTML5) {
        _s.o._setAutoPlay(_t.sID, autoPlay);
        if (autoPlay) {
          if (!_t.instanceCount && _t.readyState === 1) {
            _t.instanceCount++;
          }
        }
      }
    };
    this.getAutoPlay = function() {
      return _t._iO.autoPlay;
    };
    this.setPosition = function(nMsecOffset) {
      if (nMsecOffset === undefined) {
        nMsecOffset = 0;
      }
      var original_pos,
          position, position1K,
          offset = (_t.isHTML5 ? Math.max(nMsecOffset,0) : Math.min(_t.duration || _t._iO.duration, Math.max(nMsecOffset, 0)));
      original_pos = _t.position;
      _t.position = offset;
      position1K = _t.position/1000;
      _t.resetOnPosition(_t.position);
      _t._iO.position = offset;
      if (!_t.isHTML5) {
        position = (_fV === 9 ? _t.position : position1K);
        if (_t.readyState && _t.readyState !== 2) {
          _s.o._setPosition(_t.sID, position, (_t.paused || !_t.playState));
        }
      } else if (_t._a) {
        if (_t._html5_canplay) {
          if (_t._a.currentTime !== position1K) {
            try {
              _t._a.currentTime = position1K;
              if (_t.playState === 0 || _t.paused) {
                _t._a.pause();
              }
            } catch(e) {
            }
          }
        } else {
        }
      }
      if (_t.isHTML5) {
        if (_t.paused) {
          _t._onTimer(true);
        }
      }
      return _t;
    };
    this.pause = function(_bCallFlash) {
      if (_t.paused || (_t.playState === 0 && _t.readyState !== 1)) {
        return _t;
      }
      _t.paused = true;
      if (!_t.isHTML5) {
        if (_bCallFlash || _bCallFlash === undefined) {
          _s.o._pause(_t.sID);
        }
      } else {
        _t._setup_html5().pause();
        _stop_html5_timer();
      }
      if (_t._iO.onpause) {
        _t._iO.onpause.apply(_t);
      }
      return _t;
    };
    this.resume = function() {
      if (!_t.paused) {
        return _t;
      }
      _t.paused = false;
      _t.playState = 1;
      if (!_t.isHTML5) {
        if (_t._iO.isMovieStar) {
          _t.setPosition(_t.position);
        }
        _s.o._pause(_t.sID);
      } else {
        _t._setup_html5().play();
        _start_html5_timer();
      }
      if (!_t._onplay_called && _t._iO.onplay) {
        _t._iO.onplay.apply(_t);
        _t._onplay_called = true;
      } else if (_t._iO.onresume) {
        _t._iO.onresume.apply(_t);
      }
      return _t;
    };
    this.togglePause = function() {
      if (_t.playState === 0) {
        _t.play({
          position: (_fV === 9 && !_t.isHTML5 ? _t.position : _t.position / 1000)
        });
        return _t;
      }
      if (_t.paused) {
        _t.resume();
      } else {
        _t.pause();
      }
      return _t;
    };
    this.setPan = function(nPan, bInstanceOnly) {
      if (typeof nPan === 'undefined') {
        nPan = 0;
      }
      if (typeof bInstanceOnly === 'undefined') {
        bInstanceOnly = false;
      }
      if (!_t.isHTML5) {
        _s.o._setPan(_t.sID, nPan);
      }
      _t._iO.pan = nPan;
      if (!bInstanceOnly) {
        _t.pan = nPan;
        _t.options.pan = nPan;
      }
      return _t;
    };
    this.setVolume = function(nVol, _bInstanceOnly) {
      if (typeof nVol === 'undefined') {
        nVol = 100;
      }
      if (typeof _bInstanceOnly === 'undefined') {
        _bInstanceOnly = false;
      }
      if (!_t.isHTML5) {
        _s.o._setVolume(_t.sID, (_s.muted && !_t.muted) || _t.muted?0:nVol);
      } else if (_t._a) {
        _t._a.volume = Math.max(0, Math.min(1, nVol/100));
      }
      _t._iO.volume = nVol;
      if (!_bInstanceOnly) {
        _t.volume = nVol;
        _t.options.volume = nVol;
      }
      return _t;
    };
    this.mute = function() {
      _t.muted = true;
      if (!_t.isHTML5) {
        _s.o._setVolume(_t.sID, 0);
      } else if (_t._a) {
        _t._a.muted = true;
      }
      return _t;
    };
    this.unmute = function() {
      _t.muted = false;
      var hasIO = typeof _t._iO.volume !== 'undefined';
      if (!_t.isHTML5) {
        _s.o._setVolume(_t.sID, hasIO?_t._iO.volume:_t.options.volume);
      } else if (_t._a) {
        _t._a.muted = false;
      }
      return _t;
    };
    this.toggleMute = function() {
      return (_t.muted?_t.unmute():_t.mute());
    };
    this.onposition = function(nPosition, oMethod, oScope) {
      _t._onPositionItems.push({
        position: nPosition,
        method: oMethod,
        scope: (typeof oScope !== 'undefined'?oScope:_t),
        fired: false
      });
      return _t;
    };
    this.processOnPosition = function() {
      var i, item, j = _t._onPositionItems.length;
      if (!j || !_t.playState || _t._onPositionFired >= j) {
        return false;
      }
      for (i=j; i--;) {
        item = _t._onPositionItems[i];
        if (!item.fired && _t.position >= item.position) {
          item.fired = true;
          _s._onPositionFired++;
          item.method.apply(item.scope,[item.position]);
        }
      }
      return true;
    };
    this.resetOnPosition = function(nPosition) {
      var i, item, j = _t._onPositionItems.length;
      if (!j) {
        return false;
      }
      for (i=j; i--;) {
        item = _t._onPositionItems[i];
        if (item.fired && nPosition <= item.position) {
          item.fired = false;
          _s._onPositionFired--;
        }
      }
      return true;
    };
    _start_html5_timer = function() {
      if (_t.isHTML5) {
        _startTimer(_t);
      }
    };
    _stop_html5_timer = function() {
      if (_t.isHTML5) {
        _stopTimer(_t);
      }
    };
    _resetProperties = function() {
      _t._onPositionItems = [];
      _t._onPositionFired = 0;
      _t._hasTimer = null;
      _t._onplay_called = false;
      _t._a = null;
      _t._html5_canplay = false;
      _t.bytesLoaded = null;
      _t.bytesTotal = null;
      _t.position = null;
      _t.duration = (_t._iO && _t._iO.duration?_t._iO.duration:null);
      _t.durationEstimate = null;
      _t.failures = 0;
      _t.loaded = false;
      _t.playState = 0;
      _t.paused = false;
      _t.readyState = 0;
      _t.muted = false;
      _t.isBuffering = false;
      _t.instanceOptions = {};
      _t.instanceCount = 0;
      _t.peakData = {
        left: 0,
        right: 0
      };
      _t.waveformData = {
        left: [],
        right: []
      };
      _t.eqData = [];
      _t.eqData.left = [];
      _t.eqData.right = [];
    };
    _resetProperties();
    this._onTimer = function(bForce) {
      var time, x = {};
      if (_t._hasTimer || bForce) {
        if (_t._a && (bForce || ((_t.playState > 0 || _t.readyState === 1) && !_t.paused))) {
          _t.duration = _t._get_html5_duration();
          _t.durationEstimate = _t.duration;
          time = _t._a.currentTime?_t._a.currentTime*1000:0;
          _t._whileplaying(time,x,x,x,x);
          return true;
        } else {
          return false;
        }
      }
    };
    this._get_html5_duration = function() {
      var d = (_t._a ? _t._a.duration*1000 : (_t._iO ? _t._iO.duration : undefined)),
          result = (d && !isNaN(d) && d !== Infinity ? d : (_t._iO ? _t._iO.duration : null));
      return result;
    };
    this._setup_html5 = function(oOptions) {
      var _iO = _mixin(_t._iO, oOptions), d = decodeURI,
          _a = _useGlobalHTML5Audio ? _s._global_a : _t._a,
          _dURL = d(_iO.url),
          _oldIO = (_a && _a._t ? _a._t.instanceOptions : null);
      if (_a) {
        if (_a._t && _oldIO.url === _iO.url && (!_t._lastURL || (_t._lastURL === _oldIO.url))) {
          return _a;
        }
        if (_useGlobalHTML5Audio && _a._t && _a._t.playState && _iO.url !== _oldIO.url) {
          _a._t.stop();
        }
        _resetProperties();
        _a.src = _iO.url;
        _t.url = _iO.url;
        _t._lastURL = _iO.url;
        _a._called_load = false;
      } else {
        _a = new Audio(_iO.url);
        _a._called_load = false;
        if (_useGlobalHTML5Audio) {
          _s._global_a = _a;
        }
      }
      _t.isHTML5 = true;
      _t._a = _a;
      _a._t = _t;
      _t._add_html5_events();
      _a.loop = (_iO.loops>1?'loop':'');
      if (_iO.autoLoad || _iO.autoPlay) {
        _a.autobuffer = 'auto';
        _a.preload = 'auto';
        _t.load();
        _a._called_load = true;
      } else {
        _a.autobuffer = false;
        _a.preload = 'none';
      }
      _a.loop = (_iO.loops>1?'loop':'');
      return _a;
    };
    this._add_html5_events = function() {
      if (_t._a._added_events) {
        return false;
      }
      var f;
      function add(oEvt, oFn, bCapture) {
        return _t._a ? _t._a.addEventListener(oEvt, oFn, bCapture||false) : null;
      }
      _t._a._added_events = true;
      for (f in _html5_events) {
        if (_html5_events.hasOwnProperty(f)) {
          add(f, _html5_events[f]);
        }
      }
      return true;
    };
    this._remove_html5_events = function() {
      var f;
      function remove(oEvt, oFn, bCapture) {
        return (_t._a ? _t._a.removeEventListener(oEvt, oFn, bCapture||false) : null);
      }
      _t._a._added_events = false;
      for (f in _html5_events) {
        if (_html5_events.hasOwnProperty(f)) {
          remove(f, _html5_events[f]);
        }
      }
    };
    this._onload = function(nSuccess) {
      var fN = 'SMSound._onload(): ', loadOK = !!(nSuccess);
      _t.loaded = loadOK;
      _t.readyState = loadOK?3:2;
      _t._onbufferchange(0);
      if (_t._iO.onload) {
        _t._iO.onload.apply(_t, [loadOK]);
      }
      return true;
    };
    this._onbufferchange = function(nIsBuffering) {
      var fN = 'SMSound._onbufferchange()';
      if (_t.playState === 0) {
        return false;
      }
      if ((nIsBuffering && _t.isBuffering) || (!nIsBuffering && !_t.isBuffering)) {
        return false;
      }
      _t.isBuffering = (nIsBuffering === 1);
      if (_t._iO.onbufferchange) {
        _t._iO.onbufferchange.apply(_t);
      }
      return true;
    };
    this._onfailure = function(msg, level, code) {
      _t.failures++;
      if (_t._iO.onfailure && _t.failures === 1) {
        _t._iO.onfailure(_t, msg, level, code);
      } else {
      }
    };
    this._onfinish = function() {
      var _io_onfinish = _t._iO.onfinish;
      _t._onbufferchange(0);
      _t.resetOnPosition(0);
      if (_t.instanceCount) {
        _t.instanceCount--;
        if (!_t.instanceCount) {
          _t.playState = 0;
          _t.paused = false;
          _t.instanceCount = 0;
          _t.instanceOptions = {};
          _t._iO = {};
          _stop_html5_timer();
        }
        if (!_t.instanceCount || _t._iO.multiShotEvents) {
          if (_io_onfinish) {
            _io_onfinish.apply(_t);
          }
        }
      }
    };
    this._whileloading = function(nBytesLoaded, nBytesTotal, nDuration, nBufferLength) {
      _t.bytesLoaded = nBytesLoaded;
      _t.bytesTotal = nBytesTotal;
      _t.duration = Math.floor(nDuration);
      _t.bufferLength = nBufferLength;
      if (!_t._iO.isMovieStar) {
        if (_t._iO.duration) {
          _t.durationEstimate = (_t.duration > _t._iO.duration) ? _t.duration : _t._iO.duration;
        } else {
          _t.durationEstimate = parseInt((_t.bytesTotal / _t.bytesLoaded) * _t.duration, 10);
        }
        if (_t.durationEstimate === undefined) {
          _t.durationEstimate = _t.duration;
        }
        if (_t.readyState !== 3 && _t._iO.whileloading) {
          _t._iO.whileloading.apply(_t);
        }
      } else {
        _t.durationEstimate = _t.duration;
        if (_t.readyState !== 3 && _t._iO.whileloading) {
          _t._iO.whileloading.apply(_t);
        }
      }
    };
    this._whileplaying = function(nPosition, oPeakData, oWaveformDataLeft, oWaveformDataRight, oEQData) {
      if (isNaN(nPosition) || nPosition === null) {
        return false;
      }
      _t.position = nPosition;
      _t.processOnPosition();
      if (!_t.isHTML5 && _fV > 8) {
        if (_t._iO.usePeakData && typeof oPeakData !== 'undefined' && oPeakData) {
          _t.peakData = {
            left: oPeakData.leftPeak,
            right: oPeakData.rightPeak
          };
        }
        if (_t._iO.useWaveformData && typeof oWaveformDataLeft !== 'undefined' && oWaveformDataLeft) {
          _t.waveformData = {
            left: oWaveformDataLeft.split(','),
            right: oWaveformDataRight.split(',')
          };
        }
        if (_t._iO.useEQData) {
          if (typeof oEQData !== 'undefined' && oEQData && oEQData.leftEQ) {
            var eqLeft = oEQData.leftEQ.split(',');
            _t.eqData = eqLeft;
            _t.eqData.left = eqLeft;
            if (typeof oEQData.rightEQ !== 'undefined' && oEQData.rightEQ) {
              _t.eqData.right = oEQData.rightEQ.split(',');
            }
          }
        }
      }
      if (_t.playState === 1) {
        if (!_t.isHTML5 && _fV === 8 && !_t.position && _t.isBuffering) {
          _t._onbufferchange(0);
        }
        if (_t._iO.whileplaying) {
          _t._iO.whileplaying.apply(_t);
        }
      }
      return true;
    };
    this._onid3 = function(oID3PropNames, oID3Data) {
      var oData = [], i, j;
      for (i = 0, j = oID3PropNames.length; i < j; i++) {
        oData[oID3PropNames[i]] = oID3Data[i];
      }
      _t.id3 = _mixin(_t.id3, oData);
      if (_t._iO.onid3) {
        _t._iO.onid3.apply(_t);
      }
    };
    this._onconnect = function(bSuccess) {
      var fN = 'SMSound._onconnect(): ';
      bSuccess = (bSuccess === 1);
      _t.connected = bSuccess;
      if (bSuccess) {
        _t.failures = 0;
        if (_idCheck(_t.sID)) {
          if (_t.getAutoPlay()) {
            _t.play(undefined, _t.getAutoPlay());
          } else if (_t._iO.autoLoad) {
            _t.load();
          }
        }
        if (_t._iO.onconnect) {
          _t._iO.onconnect.apply(_t,[bSuccess]);
        }
      }
    };
    this._ondataerror = function(sError) {
      if (_t.playState > 0) {
        if (_t._iO.ondataerror) {
          _t._iO.ondataerror.apply(_t);
        }
      }
    };
  };
  _getDocument = function() {
    return (_doc.body || _doc._docElement || _doc.getElementsByTagName('div')[0]);
  };
  _id = function(sID) {
    return _doc.getElementById(sID);
  };
  _mixin = function(oMain, oAdd) {
    var o1 = {}, i, o2, o;
    for (i in oMain) {
      if (oMain.hasOwnProperty(i)) {
        o1[i] = oMain[i];
      }
    }
    o2 = (typeof oAdd === 'undefined'?_s.defaultOptions:oAdd);
    for (o in o2) {
      if (o2.hasOwnProperty(o) && typeof o1[o] === 'undefined') {
        o1[o] = o2[o];
      }
    }
    return o1;
  };
  _event = (function() {
    var old = (_win.attachEvent),
    evt = {
      add: (old?'attachEvent':'addEventListener'),
      remove: (old?'detachEvent':'removeEventListener')
    };
    function getArgs(oArgs) {
      var args = _slice.call(oArgs), len = args.length;
      if (old) {
        args[1] = 'on' + args[1];
        if (len > 3) {
          args.pop();
        }
      } else if (len === 3) {
        args.push(false);
      }
      return args;
    }
    function apply(args, sType) {
      var element = args.shift(),
          method = [evt[sType]];
      if (old) {
        element[method](args[0], args[1]);
      } else {
        element[method].apply(element, args);
      }
    }
    function add() {
      apply(getArgs(arguments), 'add');
    }
    function remove() {
      apply(getArgs(arguments), 'remove');
    }
    return {
      'add': add,
      'remove': remove
    };
  }());
  function _html5_event(oFn) {
    return function(e) {
      if (!this._t || !this._t._a) {
        return null;
      } else {
        return oFn.call(this, e);
      }
    };
  }
  _html5_events = {
    abort: _html5_event(function(e) {
    }),
    canplay: _html5_event(function(e) {
      if (this._t._html5_canplay) {
        return true;
      }
      this._t._html5_canplay = true;
      this._t._onbufferchange(0);
      var position1K = (!isNaN(this._t.position)?this._t.position/1000:null);
      if (this._t.position && this.currentTime !== position1K) {
        try {
          this.currentTime = position1K;
        } catch(ee) {
        }
      }
    }),
    load: _html5_event(function(e) {
      if (!this._t.loaded) {
        this._t._onbufferchange(0);
        this._t._whileloading(this._t.bytesTotal, this._t.bytesTotal, this._t._get_html5_duration());
        this._t._onload(true);
      }
    }),
    emptied: _html5_event(function(e) {
    }),
    ended: _html5_event(function(e) {
      this._t._onfinish();
    }),
    error: _html5_event(function(e) {
      this._t._onload(false);
    }),
    loadeddata: _html5_event(function(e) {
      var t = this._t,
          bytesTotal = t.bytesTotal || 1;
      if (!t._loaded && !_isSafari) {
        t.duration = t._get_html5_duration();
        t._whileloading(bytesTotal, bytesTotal, t._get_html5_duration());
        t._onload(true);
      }
    }),
    loadedmetadata: _html5_event(function(e) {
    }),
    loadstart: _html5_event(function(e) {
      this._t._onbufferchange(1);
    }),
    play: _html5_event(function(e) {
      this._t._onbufferchange(0);
    }),
    playing: _html5_event(function(e) {
      this._t._onbufferchange(0);
    }),
    progress: _html5_event(function(e) {
      if (this._t.loaded) {
        return false;
      }
      var i, j, str, buffered = 0,
          isProgress = (e.type === 'progress'),
          ranges = e.target.buffered,
          loaded = (e.loaded||0),
          total = (e.total||1);
      if (ranges && ranges.length) {
        for (i=ranges.length; i--;) {
          buffered = (ranges.end(i) - ranges.start(i));
        }
        loaded = buffered/e.target.duration;
      }
      if (!isNaN(loaded)) {
        this._t._onbufferchange(0);
        this._t._whileloading(loaded, total, this._t._get_html5_duration());
        if (loaded && total && loaded === total) {
          _html5_events.load.call(this, e);
        }
      }
    }),
    ratechange: _html5_event(function(e) {
    }),
    suspend: _html5_event(function(e) {
      _html5_events.progress.call(this, e);
    }),
    stalled: _html5_event(function(e) {
    }),
    timeupdate: _html5_event(function(e) {
      this._t._onTimer();
    }),
    waiting: _html5_event(function(e) {
      this._t._onbufferchange(1);
    })
  };
  _html5OK = function(iO) {
    return (!iO.serverURL && (iO.type?_html5CanPlay({type:iO.type}):_html5CanPlay({url:iO.url})||_s.html5Only));
  };
  _html5Unload = function(oAudio) {
    if (oAudio) {
      oAudio.src = (_ua.match(/gecko/i) ? '' : _emptyURL);
    }
  };
  _html5CanPlay = function(o) {
    if (!_s.useHTML5Audio || !_s.hasHTML5) {
      return false;
    }
    var url = (o.url || null),
        mime = (o.type || null),
        aF = _s.audioFormats,
        result,
        offset,
        fileExt,
        item;
    function preferFlashCheck(kind) {
      return (_s.preferFlash && _hasFlash && !_s.ignoreFlash && (typeof _s.flash[kind] !== 'undefined' && _s.flash[kind]));
    }
    if (mime && _s.html5[mime] !== 'undefined') {
      return (_s.html5[mime] && !preferFlashCheck(mime));
    }
    if (!_html5Ext) {
      _html5Ext = [];
      for (item in aF) {
        if (aF.hasOwnProperty(item)) {
          _html5Ext.push(item);
          if (aF[item].related) {
            _html5Ext = _html5Ext.concat(aF[item].related);
          }
        }
      }
      _html5Ext = new RegExp('\\.('+_html5Ext.join('|')+')(\\?.*)?$','i');
    }
    fileExt = (url ? url.toLowerCase().match(_html5Ext) : null);
    if (!fileExt || !fileExt.length) {
      if (!mime) {
        return false;
      } else {
        offset = mime.indexOf(';');
        fileExt = (offset !== -1?mime.substr(0,offset):mime).substr(6);
      }
    } else {
      fileExt = fileExt[1];
    }
    if (fileExt && typeof _s.html5[fileExt] !== 'undefined') {
      return (_s.html5[fileExt] && !preferFlashCheck(fileExt));
    } else {
      mime = 'audio/'+fileExt;
      result = _s.html5.canPlayType({type:mime});
      _s.html5[fileExt] = result;
      return (result && _s.html5[mime] && !preferFlashCheck(mime));
    }
  };
  _testHTML5 = function() {
    if (!_s.useHTML5Audio || typeof Audio === 'undefined') {
      return false;
    }
    var a = (typeof Audio !== 'undefined' ? (_isOpera ? new Audio(null) : new Audio()) : null),
        item, support = {}, aF, i;
    function _cp(m) {
      var canPlay, i, j, isOK = false;
      if (!a || typeof a.canPlayType !== 'function') {
        return false;
      }
      if (m instanceof Array) {
        for (i=0, j=m.length; i<j && !isOK; i++) {
          if (_s.html5[m[i]] || a.canPlayType(m[i]).match(_s.html5Test)) {
            isOK = true;
            _s.html5[m[i]] = true;
            _s.flash[m[i]] = !!(_s.preferFlash && _hasFlash && m[i].match(_flashMIME));
          }
        }
        return isOK;
      } else {
        canPlay = (a && typeof a.canPlayType === 'function' ? a.canPlayType(m) : false);
        return !!(canPlay && (canPlay.match(_s.html5Test)));
      }
    }
    aF = _s.audioFormats;
    for (item in aF) {
      if (aF.hasOwnProperty(item)) {
        support[item] = _cp(aF[item].type);
        support['audio/'+item] = support[item];
        if (_s.preferFlash && !_s.ignoreFlash && item.match(_flashMIME)) {
          _s.flash[item] = true;
        } else {
          _s.flash[item] = false;
        }
        if (aF[item] && aF[item].related) {
          for (i=aF[item].related.length; i--;) {
            support['audio/'+aF[item].related[i]] = support[item];
            _s.html5[aF[item].related[i]] = support[item];
            _s.flash[aF[item].related[i]] = support[item];
          }
        }
      }
    }
    support.canPlayType = (a?_cp:null);
    _s.html5 = _mixin(_s.html5, support);
    return true;
  };
  _strings = {
  };
  _str = function() {
  };
  _loopFix = function(sOpt) {
    if (_fV === 8 && sOpt.loops > 1 && sOpt.stream) {
      sOpt.stream = false;
    }
    return sOpt;
  };
  _policyFix = function(sOpt, sPre) {
    if (sOpt && !sOpt.usePolicyFile && (sOpt.onid3 || sOpt.usePeakData || sOpt.useWaveformData || sOpt.useEQData)) {
      sOpt.usePolicyFile = true;
    }
    return sOpt;
  };
  _complain = function(sMsg) {
  };
  _doNothing = function() {
    return false;
  };
  _disableObject = function(o) {
    var oProp;
    for (oProp in o) {
      if (o.hasOwnProperty(oProp) && typeof o[oProp] === 'function') {
        o[oProp] = _doNothing;
      }
    }
    oProp = null;
  };
  _failSafely = function(bNoDisable) {
    if (typeof bNoDisable === 'undefined') {
      bNoDisable = false;
    }
    if (_disabled || bNoDisable) {
      _s.disable(bNoDisable);
    }
  };
  _normalizeMovieURL = function(smURL) {
    var urlParams = null;
    if (smURL) {
      if (smURL.match(/\.swf(\?.*)?$/i)) {
        urlParams = smURL.substr(smURL.toLowerCase().lastIndexOf('.swf?') + 4);
        if (urlParams) {
          return smURL;
        }
      } else if (smURL.lastIndexOf('/') !== smURL.length - 1) {
        smURL = smURL + '/';
      }
    }
    return (smURL && smURL.lastIndexOf('/') !== - 1?smURL.substr(0, smURL.lastIndexOf('/') + 1):'./') + _s.movieURL;
  };
  _setVersionInfo = function() {
    _fV = parseInt(_s.flashVersion, 10);
    if (_fV !== 8 && _fV !== 9) {
      _s.flashVersion = _fV = _defaultFlashVersion;
    }
    var isDebug = (_s.debugMode || _s.debugFlash?'_debug.swf':'.swf');
    if (_s.useHTML5Audio && !_s.html5Only && _s.audioFormats.mp4.required && _fV < 9) {
      _s.flashVersion = _fV = 9;
    }
    _s.version = _s.versionNumber + (_s.html5Only?' (HTML5-only mode)':(_fV === 9?' (AS3/Flash 9)':' (AS2/Flash 8)'));
    if (_fV > 8) {
      _s.defaultOptions = _mixin(_s.defaultOptions, _s.flash9Options);
      _s.features.buffering = true;
      _s.defaultOptions = _mixin(_s.defaultOptions, _s.movieStarOptions);
      _s.filePatterns.flash9 = new RegExp('\\.(mp3|' + _netStreamTypes.join('|') + ')(\\?.*)?$', 'i');
      _s.features.movieStar = true;
    } else {
      _s.features.movieStar = false;
    }
    _s.filePattern = _s.filePatterns[(_fV !== 8?'flash9':'flash8')];
    _s.movieURL = (_fV === 8?'soundmanager2.swf':'soundmanager2_flash9.swf').replace('.swf', isDebug);
    _s.features.peakData = _s.features.waveformData = _s.features.eqData = (_fV > 8);
  };
  _setPolling = function(bPolling, bHighPerformance) {
    if (!_s.o) {
      return false;
    }
    _s.o._setPolling(bPolling, bHighPerformance);
  };
  _initDebug = function() {
    if (_s.debugURLParam.test(_wl)) {
      _s.debugMode = true;
    }
  };
  _idCheck = this.getSoundById;
  _getSWFCSS = function() {
    var css = [];
    if (_s.debugMode) {
      css.push(_s.swfCSS.sm2Debug);
    }
    if (_s.debugFlash) {
      css.push(_s.swfCSS.flashDebug);
    }
    if (_s.useHighPerformance) {
      css.push(_s.swfCSS.highPerf);
    }
    return css.join(' ');
  };
  _flashBlockHandler = function() {
    var name = _str('fbHandler'),
        p = _s.getMoviePercent(),
        css = _s.swfCSS,
        error = {type:'FLASHBLOCK'};
    if (_s.html5Only) {
      return false;
    }
    if (!_s.ok()) {
      if (_needsFlash) {
        _s.oMC.className = _getSWFCSS() + ' ' + css.swfDefault + ' ' + (p === null?css.swfTimedout:css.swfError);
      }
      _s.didFlashBlock = true;
      _processOnEvents({type:'ontimeout', ignoreInit:true, error:error});
      _catchError(error);
    } else {
      if (_s.didFlashBlock) {
      }
      if (_s.oMC) {
        _s.oMC.className = [_getSWFCSS(), css.swfDefault, css.swfLoaded + (_s.didFlashBlock?' '+css.swfUnblocked:'')].join(' ');
      }
    }
  };
  _addOnEvent = function(sType, oMethod, oScope) {
    if (typeof _on_queue[sType] === 'undefined') {
      _on_queue[sType] = [];
    }
    _on_queue[sType].push({
      'method': oMethod,
      'scope': (oScope || null),
      'fired': false
    });
  };
  _processOnEvents = function(oOptions) {
    if (!oOptions) {
      oOptions = {
        type: 'onready'
      };
    }
    if (!_didInit && oOptions && !oOptions.ignoreInit) {
      return false;
    }
    if (oOptions.type === 'ontimeout' && _s.ok()) {
      return false;
    }
    var status = {
          success: (oOptions && oOptions.ignoreInit?_s.ok():!_disabled)
        },
        srcQueue = (oOptions && oOptions.type?_on_queue[oOptions.type]||[]:[]),
        queue = [], i, j,
        args = [status],
        canRetry = (_needsFlash && _s.useFlashBlock && !_s.ok());
    if (oOptions.error) {
      args[0].error = oOptions.error;
    }
    for (i = 0, j = srcQueue.length; i < j; i++) {
      if (srcQueue[i].fired !== true) {
        queue.push(srcQueue[i]);
      }
    }
    if (queue.length) {
      for (i = 0, j = queue.length; i < j; i++) {
        if (queue[i].scope) {
          queue[i].method.apply(queue[i].scope, args);
        } else {
          queue[i].method.apply(this, args);
        }
        if (!canRetry) {
          queue[i].fired = true;
        }
      }
    }
    return true;
  };
  _initUserOnload = function() {
    _win.setTimeout(function() {
      if (_s.useFlashBlock) {
        _flashBlockHandler();
      }
      _processOnEvents();
      if (_s.onload instanceof Function) {
        _s.onload.apply(_win);
      }
      if (_s.waitForWindowLoad) {
        _event.add(_win, 'load', _initUserOnload);
      }
    },1);
  };
  _detectFlash = function() {
    if (_hasFlash !== undefined) {
      return _hasFlash;
    }
    var hasPlugin = false, n = navigator, nP = n.plugins, obj, type, types, AX = _win.ActiveXObject;
    if (nP && nP.length) {
      type = 'application/x-shockwave-flash';
      types = n.mimeTypes;
      if (types && types[type] && types[type].enabledPlugin && types[type].enabledPlugin.description) {
        hasPlugin = true;
      }
    } else if (typeof AX !== 'undefined') {
      try {
        obj = new AX('ShockwaveFlash.ShockwaveFlash');
      } catch(e) {
      }
      hasPlugin = (!!obj);
    }
    _hasFlash = hasPlugin;
    return hasPlugin;
  };
  _featureCheck = function() {
    var needsFlash, item,
        isSpecial = (_is_iDevice && !!(_ua.match(/os (1|2|3_0|3_1)/i)));
    if (isSpecial) {
      _s.hasHTML5 = false;
      _s.html5Only = true;
      if (_s.oMC) {
        _s.oMC.style.display = 'none';
      }
      return false;
    }
    if (_s.useHTML5Audio) {
      if (!_s.html5 || !_s.html5.canPlayType) {
        _s.hasHTML5 = false;
        return true;
      } else {
        _s.hasHTML5 = true;
      }
      if (_isBadSafari) {
        if (_detectFlash()) {
          return true;
        }
      }
    } else {
      return true;
    }
    for (item in _s.audioFormats) {
      if (_s.audioFormats.hasOwnProperty(item)) {
        if ((_s.audioFormats[item].required && !_s.html5.canPlayType(_s.audioFormats[item].type)) || _s.flash[item] || _s.flash[_s.audioFormats[item].type]) {
          needsFlash = true;
        }
      }
    }
    if (_s.ignoreFlash) {
      needsFlash = false;
    }
    _s.html5Only = (_s.hasHTML5 && _s.useHTML5Audio && !needsFlash);
    return (!_s.html5Only);
  };
  _startTimer = function(oSound) {
    if (!oSound._hasTimer) {
      oSound._hasTimer = true;
    }
  };
  _stopTimer = function(oSound) {
    if (oSound._hasTimer) {
      oSound._hasTimer = false;
    }
  };
  _catchError = function(options) {
    options = (typeof options !== 'undefined' ? options : {});
    if (_s.onerror instanceof Function) {
      _s.onerror.apply(_win, [{type:(typeof options.type !== 'undefined' ? options.type : null)}]);
    }
    if (typeof options.fatal !== 'undefined' && options.fatal) {
      _s.disable();
    }
  };
  _badSafariFix = function() {
    if (!_isBadSafari || !_detectFlash()) {
      return false;
    }
    var aF = _s.audioFormats, i, item;
    for (item in aF) {
      if (aF.hasOwnProperty(item)) {
        if (item === 'mp3' || item === 'mp4') {
          _s.html5[item] = false;
          if (aF[item] && aF[item].related) {
            for (i = aF[item].related.length; i--;) {
              _s.html5[aF[item].related[i]] = false;
            }
          }
        }
      }
    }
  };
  this._setSandboxType = function(sandboxType) {
  };
  this._externalInterfaceOK = function(flashDate) {
    if (_s.swfLoaded) {
      return false;
    }
    var eiTime = new Date().getTime();
    _s.swfLoaded = true;
    _tryInitOnFocus = false;
    if (_isBadSafari) {
      _badSafariFix();
    }
    if (_isIE) {
      setTimeout(_init, 100);
    } else {
      _init();
    }
  };
  _createMovie = function(smID, smURL) {
    if (_didAppend && _appendSuccess) {
      return false;
    }
    function _initMsg() {
    }
    if (_s.html5Only) {
      _setVersionInfo();
      _initMsg();
      _s.oMC = _id(_s.movieID);
      _init();
      _didAppend = true;
      _appendSuccess = true;
      return false;
    }
    var remoteURL = (smURL || _s.url),
    localURL = (_s.altURL || remoteURL),
    swfTitle = 'JS/Flash audio component (SoundManager 2)',
    oEmbed, oMovie, oTarget = _getDocument(), tmp, movieHTML, oEl, extraClass = _getSWFCSS(),
    s, x, sClass, side = 'auto', isRTL = null,
    html = _doc.getElementsByTagName('html')[0];
    isRTL = (html && html.dir && html.dir.match(/rtl/i));
    smID = (typeof smID === 'undefined'?_s.id:smID);
    function param(name, value) {
      return '<param name="'+name+'" value="'+value+'" />';
    }
    _setVersionInfo();
    _s.url = _normalizeMovieURL(_overHTTP?remoteURL:localURL);
    smURL = _s.url;
    _s.wmode = (!_s.wmode && _s.useHighPerformance ? 'transparent' : _s.wmode);
    if (_s.wmode !== null && (_ua.match(/msie 8/i) || (!_isIE && !_s.useHighPerformance)) && navigator.platform.match(/win32|win64/i)) {
      _s.specialWmodeCase = true;
      _s.wmode = null;
    }
    oEmbed = {
      'name': smID,
      'id': smID,
      'src': smURL,
      'width': side,
      'height': side,
      'quality': 'high',
      'allowScriptAccess': _s.allowScriptAccess,
      'bgcolor': _s.bgColor,
      'pluginspage': _http+'www.macromedia.com/go/getflashplayer',
      'title': swfTitle,
      'type': 'application/x-shockwave-flash',
      'wmode': _s.wmode,
      'hasPriority': 'true'
    };
    if (_s.debugFlash) {
      oEmbed.FlashVars = 'debug=1';
    }
    if (!_s.wmode) {
      delete oEmbed.wmode;
    }
    if (_isIE) {
      oMovie = _doc.createElement('div');
      movieHTML = [
        '<object id="' + smID + '" data="' + smURL + '" type="' + oEmbed.type + '" title="' + oEmbed.title +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + _http+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" width="' + oEmbed.width + '" height="' + oEmbed.height + '">',
        param('movie', smURL),
        param('AllowScriptAccess', _s.allowScriptAccess),
        param('quality', oEmbed.quality),
        (_s.wmode? param('wmode', _s.wmode): ''),
        param('bgcolor', _s.bgColor),
        param('hasPriority', 'true'),
        (_s.debugFlash ? param('FlashVars', oEmbed.FlashVars) : ''),
        '</object>'
      ].join('');
    } else {
      oMovie = _doc.createElement('embed');
      for (tmp in oEmbed) {
        if (oEmbed.hasOwnProperty(tmp)) {
          oMovie.setAttribute(tmp, oEmbed[tmp]);
        }
      }
    }
    _initDebug();
    extraClass = _getSWFCSS();
    oTarget = _getDocument();
    if (oTarget) {
      _s.oMC = (_id(_s.movieID) || _doc.createElement('div'));
      if (!_s.oMC.id) {
        _s.oMC.id = _s.movieID;
        _s.oMC.className = _s.swfCSS.swfDefault + ' ' + extraClass;
        s = null;
        oEl = null;
        if (!_s.useFlashBlock) {
          if (_s.useHighPerformance) {
            s = {
              'position': 'fixed',
              'width': '8px',
              'height': '8px',
              'bottom': '0px',
              'left': '0px',
              'overflow': 'hidden'
            };
          } else {
            s = {
              'position': 'absolute',
              'width': '6px',
              'height': '6px',
              'top': '-9999px',
              'left': '-9999px'
            };
            if (isRTL) {
              s.left = Math.abs(parseInt(s.left,10))+'px';
            }
          }
        }
        if (_isWebkit) {
          _s.oMC.style.zIndex = 10000;
        }
        if (!_s.debugFlash) {
          for (x in s) {
            if (s.hasOwnProperty(x)) {
              _s.oMC.style[x] = s[x];
            }
          }
        }
        try {
          if (!_isIE) {
            _s.oMC.appendChild(oMovie);
          }
          oTarget.appendChild(_s.oMC);
          if (_isIE) {
            oEl = _s.oMC.appendChild(_doc.createElement('div'));
            oEl.className = _s.swfCSS.swfBox;
            oEl.innerHTML = movieHTML;
          }
          _appendSuccess = true;
        } catch(e) {
          throw new Error(_str('domError')+' \n'+e.toString());
        }
      } else {
        sClass = _s.oMC.className;
        _s.oMC.className = (sClass?sClass+' ':_s.swfCSS.swfDefault) + (extraClass?' '+extraClass:'');
        _s.oMC.appendChild(oMovie);
        if (_isIE) {
          oEl = _s.oMC.appendChild(_doc.createElement('div'));
          oEl.className = _s.swfCSS.swfBox;
          oEl.innerHTML = movieHTML;
        }
        _appendSuccess = true;
      }
    }
    _didAppend = true;
    _initMsg();
    return true;
  };
  _initMovie = function() {
    if (_s.html5Only) {
      _createMovie();
      return false;
    }
    if (_s.o) {
      return false;
    }
    _s.o = _s.getMovie(_s.id);
    if (!_s.o) {
      if (!_oRemoved) {
        _createMovie(_s.id, _s.url);
      } else {
        if (!_isIE) {
          _s.oMC.appendChild(_oRemoved);
        } else {
          _s.oMC.innerHTML = _oRemovedHTML;
        }
        _oRemoved = null;
        _didAppend = true;
      }
      _s.o = _s.getMovie(_s.id);
    }
    if (_s.oninitmovie instanceof Function) {
      setTimeout(_s.oninitmovie, 1);
    }
    return true;
  };
  _delayWaitForEI = function() {
    setTimeout(_waitForEI, 1000);
  };
  _waitForEI = function() {
    if (_waitingForEI) {
      return false;
    }
    _waitingForEI = true;
    _event.remove(_win, 'load', _delayWaitForEI);
    if (_tryInitOnFocus && !_isFocused) {
      return false;
    }
    var p;
    if (!_didInit) {
      p = _s.getMoviePercent();
    }
    setTimeout(function() {
      p = _s.getMoviePercent();
      if (!_didInit && _okToDisable) {
        if (p === null) {
          if (_s.useFlashBlock || _s.flashLoadTimeout === 0) {
            if (_s.useFlashBlock) {
              _flashBlockHandler();
            }
          } else {
            _failSafely(true);
          }
        } else {
          if (_s.flashLoadTimeout === 0) {
          } else {
            _failSafely(true);
          }
        }
      }
    }, _s.flashLoadTimeout);
  };
  _handleFocus = function() {
    function cleanup() {
      _event.remove(_win, 'focus', _handleFocus);
      _event.remove(_win, 'load', _handleFocus);
    }
    if (_isFocused || !_tryInitOnFocus) {
      cleanup();
      return true;
    }
    _okToDisable = true;
    _isFocused = true;
    if (_isSafari && _tryInitOnFocus) {
      _event.remove(_win, 'mousemove', _handleFocus);
    }
    _waitingForEI = false;
    cleanup();
    return true;
  };
  _showSupport = function() {
    var item, tests = [];
    if (_s.useHTML5Audio && _s.hasHTML5) {
      for (item in _s.audioFormats) {
        if (_s.audioFormats.hasOwnProperty(item)) {
          tests.push(item + ': ' + _s.html5[item] + (!_s.html5[item] && _hasFlash && _s.flash[item] ? ' (using flash)' : (_s.preferFlash && _s.flash[item] && _hasFlash ? ' (preferring flash)': (!_s.html5[item] ? ' (' + (_s.audioFormats[item].required ? 'required, ':'') + 'and no flash support)' : ''))));
        }
      }
    }
  };
  _initComplete = function(bNoDisable) {
    if (_didInit) {
      return false;
    }
    if (_s.html5Only) {
      _didInit = true;
      _initUserOnload();
      return true;
    }
    var wasTimeout = (_s.useFlashBlock && _s.flashLoadTimeout && !_s.getMoviePercent()),
        error;
    if (!wasTimeout) {
      _didInit = true;
      if (_disabled) {
        error = {type: (!_hasFlash && _needsFlash ? 'NO_FLASH' : 'INIT_TIMEOUT')};
      }
    }
    if (_disabled || bNoDisable) {
      if (_s.useFlashBlock && _s.oMC) {
        _s.oMC.className = _getSWFCSS() + ' ' + (_s.getMoviePercent() === null?_s.swfCSS.swfTimedout:_s.swfCSS.swfError);
      }
      _processOnEvents({type:'ontimeout', error:error});
      _catchError(error);
      return false;
    } else {
    }
    if (_s.waitForWindowLoad && !_windowLoaded) {
      _event.add(_win, 'load', _initUserOnload);
      return false;
    } else {
      _initUserOnload();
    }
    return true;
  };
  _init = function() {
    if (_didInit) {
      return false;
    }
    function _cleanup() {
      _event.remove(_win, 'load', _s.beginDelayedInit);
    }
    if (_s.html5Only) {
      if (!_didInit) {
        _cleanup();
        _s.enabled = true;
        _initComplete();
      }
      return true;
    }
    _initMovie();
    try {
      _s.o._externalInterfaceTest(false);
      _setPolling(true, (_s.flashPollingInterval || (_s.useHighPerformance ? 10 : 50)));
      if (!_s.debugMode) {
        _s.o._disableDebug();
      }
      _s.enabled = true;
      if (!_s.html5Only) {
        _event.add(_win, 'unload', _doNothing);
      }
    } catch(e) {
      _catchError({type:'JS_TO_FLASH_EXCEPTION', fatal:true});
      _failSafely(true);
      _initComplete();
      return false;
    }
    _initComplete();
    _cleanup();
    return true;
  };
  _domContentLoaded = function() {
    if (_didDCLoaded) {
      return false;
    }
    _didDCLoaded = true;
    _initDebug();
    if (!_hasFlash && _s.hasHTML5) {
      _s.useHTML5Audio = true;
      _s.preferFlash = false;
    }
    _testHTML5();
    _s.html5.usingFlash = _featureCheck();
    _needsFlash = _s.html5.usingFlash;
    _showSupport();
    if (!_hasFlash && _needsFlash) {
      _s.flashLoadTimeout = 1;
    }
    if (_doc.removeEventListener) {
      _doc.removeEventListener('DOMContentLoaded', _domContentLoaded, false);
    }
    _initMovie();
    return true;
  };
  _domContentLoadedIE = function() {
    if (_doc.readyState === 'complete') {
      _domContentLoaded();
      _doc.detachEvent('onreadystatechange', _domContentLoadedIE);
    }
    return true;
  };
  _detectFlash();
  _event.add(_win, 'focus', _handleFocus);
  _event.add(_win, 'load', _handleFocus);
  _event.add(_win, 'load', _delayWaitForEI);
  if (_isSafari && _tryInitOnFocus) {
    _event.add(_win, 'mousemove', _handleFocus);
  }
  if (_doc.addEventListener) {
    _doc.addEventListener('DOMContentLoaded', _domContentLoaded, false);
  } else if (_doc.attachEvent) {
    _doc.attachEvent('onreadystatechange', _domContentLoadedIE);
  } else {
    _catchError({type:'NO_DOM2_EVENTS', fatal:true});
  }
  if (_doc.readyState === 'complete') {
    setTimeout(_domContentLoaded,100);
  }
}
// SM2_DEFER details: http://www.schillmania.com/projects/soundmanager2/doc/getstarted/#lazy-loading
if (typeof SM2_DEFER === 'undefined' || !SM2_DEFER) {
  soundManager = new SoundManager();
}
window.SoundManager = SoundManager;
window.soundManager = soundManager;
}(window));
/**
 * SoundManager 2 Demo: "Page as playlist" UI
 * ----------------------------------------------
 * http://schillmania.com/projects/soundmanager2/
 *
 * An example of a Muxtape.com-style UI, where an
 * unordered list of MP3 links becomes a playlist
 *
 * Flash 9 "MovieStar" edition supports MPEG4
 * audio as well.
 *
 * Requires SoundManager 2 Javascript API.
 */

/*jslint white: false, onevar: true, undef: true, nomen: false, eqeqeq: true, plusplus: false, bitwise: true, newcap: true, immed: true */
/*global soundManager, window, document, navigator, setTimeout, attachEvent, Metadata, PP_CONFIG */


var pagePlayer = null;

function PagePlayer() {

  var self = this,
      pl = this,
      sm = soundManager, // soundManager instance
      _event,
      vuDataCanvas = null,
      controlTemplate = null,
      _head = document.getElementsByTagName('head')[0],
      spectrumContainer = null,
      // sniffing for favicon stuff, IE workarounds and touchy-feely devices
      ua = navigator.userAgent,
      supportsFavicon = (ua.match(/(opera|firefox)/i)),
      isTouchDevice = (ua.match(/ipad|ipod|iphone/i)),
      cleanup;

  // configuration options
  // note that if Flash 9 is required, you must set soundManager.flashVersion = 9 in your script before this point.

  this.config = {
    usePeakData: false,     // [Flash 9 only]: show peak data
    useWaveformData: false, // [Flash 9 only]: enable sound spectrum (raw waveform data) - WARNING: CPU-INTENSIVE: may set CPUs on fire.
    useEQData: false,       // [Flash 9 only]: enable sound EQ (frequency spectrum data) - WARNING: Also CPU-intensive.
    fillGraph: false,       // [Flash 9 only]: draw full lines instead of only top (peak) spectrum points
    useMovieStar: true,     // [Flash 9 only]: Support for MPEG4 audio formats
    allowRightClick: true,  // let users right-click MP3 links ("save as...", etc.) or discourage (can't prevent.)
    useThrottling: true,    // try to rate-limit potentially-expensive calls (eg. dragging position around)
    autoStart: false,       // begin playing first sound when page loads
    playNext: true,         // stop after one sound, or play through list until end
    updatePageTitle: true,  // change the page title while playing sounds
    emptyTime: '-:--',      // null/undefined timer values (before data is available)
    useFavIcon: false       // try to show peakData in address bar (Firefox + Opera) - may be too CPU heavy
  };

  this.css = {              // CSS class names appended to link during various states
    sDefault: 'sm2_link',   // default state
    sLoading: 'sm2_loading',
    sPlaying: 'sm2_playing',
    sPaused: 'sm2_paused'
  };

  this.sounds = [];
  this.soundsByObject = [];
  this.lastSound = null;
  this.soundCount = 0;
  this.strings = [];
  this.dragActive = false;
  this.dragExec = new Date();
  this.dragTimer = null;
  this.pageTitle = document.title;
  this.lastWPExec = new Date();
  this.lastWLExec = new Date();
  this.vuMeterData = [];
  this.oControls = null;

  this._mergeObjects = function(oMain,oAdd) {
    // non-destructive merge
    var o1 = {}, o2, i, o; // clone o1
    for (i in oMain) {
      if (oMain.hasOwnProperty(i)) {
        o1[i] = oMain[i];
      }
    }
    o2 = (typeof oAdd === 'undefined'?{}:oAdd);
    for (o in o2) {
      if (typeof o1[o] === 'undefined') {
        o1[o] = o2[o];
      }
    }
    return o1;
  };

  _event = (function() {

    var old = (window.attachEvent && !window.addEventListener),
    _slice = Array.prototype.slice,
    evt = {
      add: (old?'attachEvent':'addEventListener'),
      remove: (old?'detachEvent':'removeEventListener')
    };

    function getArgs(oArgs) {
      var args = _slice.call(oArgs), len = args.length;
      if (old) {
        args[1] = 'on' + args[1]; // prefix
        if (len > 3) {
          args.pop(); // no capture
        }
      } else if (len === 3) {
        args.push(false);
      }
      return args;
    }

    function apply(args, sType) {
      var element = args.shift(),
          method = [evt[sType]];
      if (old) {
        element[method](args[0], args[1]);
      } else {
        element[method].apply(element, args);
      }
    }

    function add() {
      apply(getArgs(arguments), 'add');
    }

    function remove() {
      apply(getArgs(arguments), 'remove');
    }

    return {
      'add': add,
      'remove': remove
    };

  }());

  // event + DOM utilities

  this.hasClass = function(o, cStr) {
    return (typeof(o.className)!=='undefined'?new RegExp('(^|\\s)'+cStr+'(\\s|$)').test(o.className):false);
  };

  this.addClass = function(o, cStr) {
    if (!o || !cStr || self.hasClass(o,cStr)) {
      return false; // safety net
    }
    o.className = (o.className?o.className+' ':'')+cStr;
  };

  this.removeClass = function(o, cStr) {
    if (!o || !cStr || !self.hasClass(o,cStr)) {
      return false;
    }
    o.className = o.className.replace(new RegExp('( '+cStr+')|('+cStr+')','g'),'');
  };

  this.select = function(className, oParent) {
    var result = self.getByClassName(className, 'div', oParent||null);
    return (result ? result[0] : null);
  };

  this.getByClassName = (document.querySelectorAll ? function(className, tagNames, oParent) { // tagNames: string or ['div', 'p'] etc.

    var pattern = ('.'+className), qs;
    if (tagNames) {
      tagNames = tagNames.split(' ');
    }
    qs = (tagNames.length > 1 ? tagNames.join(pattern+', ') : tagNames[0]+pattern);
    return (oParent?oParent:document).querySelectorAll(qs);

  } : function(className, tagNames, oParent) {

    var node = (oParent?oParent:document), matches = [], i, j, nodes = [];
    if (tagNames) {
      tagNames = tagNames.split(' ');
    }
    if (tagNames instanceof Array) {
      for (i=tagNames.length; i--;) {
        if (!nodes || !nodes[tagNames[i]]) {
          nodes[tagNames[i]] = node.getElementsByTagName(tagNames[i]);
        }
      }
      for (i=tagNames.length; i--;) {
        for (j=nodes[tagNames[i]].length; j--;) {
          if (self.hasClass(nodes[tagNames[i]][j], className)) {
            matches.push(nodes[tagNames[i]][j]);
          }
        }
      }
    } else {
      nodes = node.all||node.getElementsByTagName('*');
      for (i=0, j=nodes.length; i<j; i++) {
        if (self.hasClass(nodes[i],className)) {
          matches.push(nodes[i]);
        }
      }
    }
    return matches;

  });

  this.isChildOfClass = function(oChild, oClass) {
    if (!oChild || !oClass) {
      return false;
    }
    while (oChild.parentNode && !self.hasClass(oChild,oClass)) {
      oChild = oChild.parentNode;
    }
    return (self.hasClass(oChild,oClass));
  };

  this.getParentByNodeName = function(oChild, sParentNodeName) {
    if (!oChild || !sParentNodeName) {
      return false;
    }
    sParentNodeName = sParentNodeName.toLowerCase();
    while (oChild.parentNode && sParentNodeName !== oChild.parentNode.nodeName.toLowerCase()) {
      oChild = oChild.parentNode;
    }
    return (oChild.parentNode && sParentNodeName === oChild.parentNode.nodeName.toLowerCase()?oChild.parentNode:null);
  };

  this.getOffX = function(o) {
    // http://www.xs4all.nl/~ppk/js/findpos.html
    var curleft = 0;
    if (o.offsetParent) {
      while (o.offsetParent) {
        curleft += o.offsetLeft;
        o = o.offsetParent;
      }
    }
    else if (o.x) {
      curleft += o.x;
    }
    return curleft;
  };

  this.getTime = function(nMSec, bAsString) {
    // convert milliseconds to mm:ss, return as object literal or string
    var nSec = Math.floor(nMSec/1000),
        min = Math.floor(nSec/60),
        sec = nSec-(min*60);
    // if (min === 0 && sec === 0) return null; // return 0:00 as null
    return (bAsString?(min+':'+(sec<10?'0'+sec:sec)):{'min':min,'sec':sec});
  };

  this.getSoundByObject = function(o) {
    return (typeof self.soundsByObject[o.id] !== 'undefined'?self.soundsByObject[o.id]:null);
  };

  this.getPreviousItem = function(o) {
    // given <li> playlist item, find previous <li> and then <a>
    if (o.previousElementSibling) {
      o = o.previousElementSibling;
    } else {
      o = o.previousSibling; // move from original node..
      while (o && o.previousSibling && o.previousSibling.nodeType !== 1) {
        o = o.previousSibling;
      }
    }
    if (o.nodeName.toLowerCase() !== 'li') {
      return null;
    } else {
      return o.getElementsByTagName('a')[0];
    }
  };

  this.playPrevious = function(oSound) {
    if (!oSound) {
      oSound = self.lastSound;
    }
    if (!oSound) {
      return false;
    }
    var previousItem = self.getPreviousItem(oSound._data.oLI);
    if (previousItem) {
      pl.handleClick({target:previousItem}); // fake a click event - aren't we sneaky. ;)
    }
    return previousItem;
  };

  this.getNextItem = function(o) {
    // given <li> playlist item, find next <li> and then <a>
    if (o.nextElementSibling) {
      o = o.nextElementSibling;
    } else {
      o = o.nextSibling; // move from original node..
      while (o && o.nextSibling && o.nextSibling.nodeType !== 1) {
        o = o.nextSibling;
      }
    }
    if (o.nodeName.toLowerCase() !== 'li') {
      return null;
    } else {
      return o.getElementsByTagName('a')[0];
    }
  };

  this.playNext = function(oSound) {
    if (!oSound) {
      oSound = self.lastSound;
    }
    if (!oSound) {
      return false;
    }
    var nextItem = self.getNextItem(oSound._data.oLI);
    if (nextItem) {
      pl.handleClick({target:nextItem}); // fake a click event - aren't we sneaky. ;)
    }
    return nextItem;
  };

  this.setPageTitle = function(sTitle) {
    if (!self.config.updatePageTitle) {
      return false;
    }
    try {
      document.title = (sTitle?sTitle+' - ':'')+self.pageTitle;
    } catch(e) {
      // oh well
      self.setPageTitle = function() {
        return false;
      };
    }
  };

  this.events = {

    // handlers for sound events as they're started/stopped/played

    play: function() {
      pl.removeClass(this._data.oLI,this._data.className);
      this._data.className = pl.css.sPlaying;
      pl.addClass(this._data.oLI,this._data.className);
      self.setPageTitle(this._data.originalTitle);
    },

    stop: function() {
      pl.removeClass(this._data.oLI,this._data.className);
      this._data.className = '';
      this._data.oPosition.style.width = '0px';
      self.setPageTitle();
      self.resetPageIcon();
    },

    pause: function() {
      if (pl.dragActive) {
        return false;
      }
      pl.removeClass(this._data.oLI,this._data.className);
      this._data.className = pl.css.sPaused;
      pl.addClass(this._data.oLI,this._data.className);
      self.setPageTitle();
      self.resetPageIcon();
    },

    resume: function() {
      if (pl.dragActive) {
        return false;
      }
      pl.removeClass(this._data.oLI,this._data.className);
      this._data.className = pl.css.sPlaying;
      pl.addClass(this._data.oLI,this._data.className);
    },

    finish: function() {
      pl.removeClass(this._data.oLI,this._data.className);
      this._data.className = '';
      this._data.oPosition.style.width = '0px';
      // play next if applicable
      if (self.config.playNext) {
        pl.playNext(this);
      } else {
        self.setPageTitle();
        self.resetPageIcon();
      }
    },

    whileloading: function() {
      function doWork() {
        this._data.oLoading.style.width = (((this.bytesLoaded/this.bytesTotal)*100)+'%'); // theoretically, this should work.
        if (!this._data.didRefresh && this._data.metadata) {
          this._data.didRefresh = true;
          this._data.metadata.refresh();
        }
      }
      if (!pl.config.useThrottling) {
        doWork.apply(this);
      } else {
        var d = new Date();
        if (d && d-self.lastWLExec>30 || this.bytesLoaded === this.bytesTotal) {
          doWork.apply(this);
          self.lastWLExec = d;
        }
      }

    },

    onload: function() {
      if (!this.loaded) {
        var oTemp = this._data.oLI.getElementsByTagName('a')[0],
            oString = oTemp.innerHTML,
            oThis = this;
        oTemp.innerHTML = oString+' <span style="font-size:0.5em"> | Load failed, d\'oh! '+(sm.sandbox.noRemote?' Possible cause: Flash sandbox is denying remote URL access.':(sm.sandbox.noLocal?'Flash denying local filesystem access':'404?'))+'</span>';
        setTimeout(function(){
          oTemp.innerHTML = oString;
          // pl.events.finish.apply(oThis); // load next
        },5000);
      } else {
        if (this._data.metadata) {
          this._data.metadata.refresh();
        }
      }
    },

    whileplaying: function() {
      var d = null;
      if (pl.dragActive || !pl.config.useThrottling) {
        self.updateTime.apply(this);
        if (sm.flashVersion >= 9) {
          if (pl.config.usePeakData && this.instanceOptions.usePeakData) {
            self.updatePeaks.apply(this);
          }
          if (pl.config.useWaveformData && this.instanceOptions.useWaveformData || pl.config.useEQData && this.instanceOptions.useEQData) {
            self.updateGraph.apply(this);
          }
        }
        if (this._data.metadata) {
          d = new Date();
          if (d && d-self.lastWPExec>500) {
            this._data.metadata.refreshMetadata(this);
            self.lastWPExec = d;
          }
        }
        this._data.oPosition.style.width = (((this.position/self.getDurationEstimate(this))*100)+'%');
      } else {
        d = new Date();
        if (d-self.lastWPExec>30) {
          self.updateTime.apply(this);
          if (sm.flashVersion >= 9) {
            if (pl.config.usePeakData && this.instanceOptions.usePeakData) {
              self.updatePeaks.apply(this);
            }
            if (pl.config.useWaveformData && this.instanceOptions.useWaveformData || pl.config.useEQData && this.instanceOptions.useEQData) {
              self.updateGraph.apply(this);
            }
          }
          if (this._data.metadata) {
            this._data.metadata.refreshMetadata(this);
          }
          this._data.oPosition.style.width = (((this.position/self.getDurationEstimate(this))*100)+'%');
          self.lastWPExec = d;
        }
      }
    }

  }; // events{}

  this.setPageIcon = function(sDataURL) {
    if (!self.config.useFavIcon || !self.config.usePeakData || !sDataURL) {
      return false;
    }
    var link = document.getElementById('sm2-favicon');
    if (link) {
      _head.removeChild(link);
      link = null;
    }
    if (!link) {
      link = document.createElement('link');
      link.id = 'sm2-favicon';
      link.rel = 'shortcut icon';
      link.type = 'image/png';
      link.href = sDataURL;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  };

  this.resetPageIcon = function() {
    if (!self.config.useFavIcon) {
      return false;
    }
    var link = document.getElementById('favicon');
    if (link) {
      link.href = '/favicon.ico';
    }
  };

  this.updatePeaks = function() {
    var o = this._data.oPeak,
        oSpan = o.getElementsByTagName('span');
    oSpan[0].style.marginTop = (13-(Math.floor(15*this.peakData.left))+'px');
    oSpan[1].style.marginTop = (13-(Math.floor(15*this.peakData.right))+'px');
    if (sm.flashVersion > 8 && self.config.useFavIcon && self.config.usePeakData) {
      self.setPageIcon(self.vuMeterData[parseInt(16*this.peakData.left,10)][parseInt(16*this.peakData.right,10)]);
    }
  };

  this.updateGraph = function() {
    if (pl.config.flashVersion < 9 || (!pl.config.useWaveformData && !pl.config.useEQData)) {
      return false;
    }
    var sbC = this._data.oGraph.getElementsByTagName('div'),
        scale, i, offset;
    if (pl.config.useWaveformData) {
      // raw waveform
      scale = 8; // Y axis (+/- this distance from 0)
      for (i=255; i--;) {
        sbC[255-i].style.marginTop = (1+scale+Math.ceil(this.waveformData.left[i]*-scale))+'px';
      }
    } else {
      // eq spectrum
      offset = 9;
      for (i=255; i--;) {
        sbC[255-i].style.marginTop = ((offset*2)-1+Math.ceil(this.eqData[i]*-offset))+'px';
      }
    }
  };

  this.resetGraph = function() {
    if (!pl.config.useEQData || pl.config.flashVersion<9) {
      return false;
    }
    var sbC = this._data.oGraph.getElementsByTagName('div'),
        scale = (!pl.config.useEQData?'9px':'17px'),
        nHeight = (!pl.config.fillGraph?'1px':'32px'),
        i;
    for (i=255; i--;) {
      sbC[255-i].style.marginTop = scale; // EQ scale
      sbC[255-i].style.height = nHeight;
    }
  };

  this.updateTime = function() {
    var str = self.strings.timing.replace('%s1',self.getTime(this.position,true));
    str = str.replace('%s2',self.getTime(self.getDurationEstimate(this),true));
    this._data.oTiming.innerHTML = str;
  };

  this.getTheDamnTarget = function(e) {
    return (e.target||(window.event?window.event.srcElement:null));
  };

  this.withinStatusBar = function(o) {
    return (self.isChildOfClass(o,'controls'));
  };

  this.handleClick = function(e) {

    // a sound (or something) was clicked - determine what and handle appropriately

    if (e.button === 2) {
      if (!pl.config.allowRightClick) {
        pl.stopEvent(e);
      }
      return pl.config.allowRightClick; // ignore right-clicks
    }
    var o = self.getTheDamnTarget(e),
        sURL, soundURL, thisSound, oControls, oLI, str;
    if (!o) {
      return true;
    }
    if (self.dragActive) {
      self.stopDrag(); // to be safe
    }
    if (self.withinStatusBar(o)) {
      // self.handleStatusClick(e);
      return false;
    }
    if (o.nodeName.toLowerCase() !== 'a') {
      o = self.getParentByNodeName(o,'a');
    }
    if (!o) {
      // not a link
      return true;
    }

    // OK, we're dealing with a link

    sURL = o.getAttribute('href');

    if (!o.href || (!sm.canPlayLink(o) && !self.hasClass(o,'playable')) || self.hasClass(o,'exclude')) {

      // do nothing, don't return anything.
      return true;

    } else {

      // we have something we're interested in.

      // find and init parent UL, if need be
      self.initUL(self.getParentByNodeName(o, 'ul'));

      // and decorate the link too, if needed
      self.initItem(o);

      soundURL = o.href;
      thisSound = self.getSoundByObject(o);

      if (thisSound) {

        // sound already exists
        self.setPageTitle(thisSound._data.originalTitle);
        if (thisSound === self.lastSound) {
          // ..and was playing (or paused) and isn't in an error state
          if (thisSound.readyState !== 2) {
            if (thisSound.playState !== 1) {
              // not yet playing
              thisSound.play();
            } else {
              thisSound.togglePause();
            }
          } else {
            sm._writeDebug('Warning: sound failed to load (security restrictions, 404 or bad format)',2);
          }
        } else {
          // ..different sound
          if (self.lastSound) {
            self.stopSound(self.lastSound);
          }
          if (spectrumContainer) {
            thisSound._data.oTimingBox.appendChild(spectrumContainer);
          }
          thisSound.togglePause(); // start playing current
        }

      } else {

        // create sound
        thisSound = sm.createSound({
          id:o.id,
          url:decodeURI(soundURL),
          onplay:self.events.play,
          onstop:self.events.stop,
          onpause:self.events.pause,
          onresume:self.events.resume,
          onfinish:self.events.finish,
          whileloading:self.events.whileloading,
          whileplaying:self.events.whileplaying,
          onmetadata:self.events.metadata,
          onload:self.events.onload
        });

        // append control template
        oControls = self.oControls.cloneNode(true);
        oLI = o.parentNode;
        oLI.appendChild(oControls);
        if (spectrumContainer) {
          oLI.appendChild(spectrumContainer);
        }
        self.soundsByObject[o.id] = thisSound;

        // tack on some custom data
        thisSound._data = {
          oLink: o, // DOM reference within SM2 object event handlers
          oLI: oLI,
          oControls: self.select('controls',oLI),
          oStatus: self.select('statusbar',oLI),
          oLoading: self.select('loading',oLI),
          oPosition: self.select('position',oLI),
          oTimingBox: self.select('timing',oLI),
          oTiming: self.select('timing',oLI).getElementsByTagName('div')[0],
          oPeak: self.select('peak',oLI),
          oGraph: self.select('spectrum-box',oLI),
          className: self.css.sPlaying,
          originalTitle: o.innerHTML,
          metadata: null
        };

        if (spectrumContainer) {
          thisSound._data.oTimingBox.appendChild(spectrumContainer);
        }

        // "Metadata"
        if (thisSound._data.oLI.getElementsByTagName('ul').length) {
          thisSound._data.metadata = new Metadata(thisSound);
        }

        // set initial timer stuff (before loading)
        str = self.strings.timing.replace('%s1',self.config.emptyTime);
        str = str.replace('%s2',self.config.emptyTime);
        thisSound._data.oTiming.innerHTML = str;
        self.sounds.push(thisSound);
        if (self.lastSound) {
          self.stopSound(self.lastSound);
        }
        self.resetGraph.apply(thisSound);
        thisSound.play();

      }

      self.lastSound = thisSound; // reference for next call
      return self.stopEvent(e);

    }

  };

  this.handleMouseDown = function(e) {
    // a sound link was clicked
    if (isTouchDevice && e.touches) {
      e = e.touches[0];
    }
    if (e.button === 2) {
      if (!pl.config.allowRightClick) {
        pl.stopEvent(e);
      }
      return pl.config.allowRightClick; // ignore right-clicks
    }
    var o = self.getTheDamnTarget(e);
    if (!o) {
      return true;
    }
    if (!self.withinStatusBar(o)) {
      return true;
    }
    self.dragActive = true;
    self.lastSound.pause();
    self.setPosition(e);
    if (!isTouchDevice) {
      _event.add(document,'mousemove',self.handleMouseMove);
    } else {
      _event.add(document,'touchmove',self.handleMouseMove);
    }
    self.addClass(self.lastSound._data.oControls,'dragging');
    return self.stopEvent(e);
  };

  this.handleMouseMove = function(e) {
    if (isTouchDevice && e.touches) {
      e = e.touches[0];
    }
    // set position accordingly
    if (self.dragActive) {
      if (self.config.useThrottling) {
        // be nice to CPU/externalInterface
        var d = new Date();
        if (d-self.dragExec>20) {
          self.setPosition(e);
        } else {
          window.clearTimeout(self.dragTimer);
          self.dragTimer = window.setTimeout(function(){self.setPosition(e);},20);
        }
        self.dragExec = d;
      } else {
        // oh the hell with it
        self.setPosition(e);
      }
    } else {
      self.stopDrag();
    }
    e.stopPropagation = true;
    return false;
  };

  this.stopDrag = function(e) {
    if (self.dragActive) {
      self.removeClass(self.lastSound._data.oControls,'dragging');
      if (!isTouchDevice) {
        _event.remove(document,'mousemove',self.handleMouseMove);
      } else {
        _event.remove(document,'touchmove',self.handleMouseMove);
      }
      if (!pl.hasClass(self.lastSound._data.oLI,self.css.sPaused)) {
        self.lastSound.resume();
      }
      self.dragActive = false;
      return self.stopEvent(e);
    }
  };

  this.handleStatusClick = function(e) {
    self.setPosition(e);
    if (!pl.hasClass(self.lastSound._data.oLI,self.css.sPaused)) {
      self.resume();
    }
    return self.stopEvent(e);
  };

  this.stopEvent = function(e) {
    if (typeof e !== 'undefined') {
      if (typeof e.preventDefault !== 'undefined') {
        e.preventDefault();
      } else {
        e.stopPropagation = true;
        e.returnValue = false;
      }
    }
    return false;
  };

  this.setPosition = function(e) {
    // called from slider control
    var oThis = self.getTheDamnTarget(e),
        x, oControl, oSound, nMsecOffset;
    if (!oThis) {
      return true;
    }
    oControl = oThis;
    while (!self.hasClass(oControl,'controls') && oControl.parentNode) {
      oControl = oControl.parentNode;
    }
    oSound = self.lastSound;
    x = parseInt(e.clientX,10);
    // play sound at this position
    nMsecOffset = Math.floor((x-self.getOffX(oControl)-4)/(oControl.offsetWidth)*self.getDurationEstimate(oSound));
    if (!isNaN(nMsecOffset)) {
      nMsecOffset = Math.min(nMsecOffset,oSound.duration);
    }
    if (!isNaN(nMsecOffset)) {
      oSound.setPosition(nMsecOffset);
    }
  };

  this.stopSound = function(oSound) {
    sm._writeDebug('stopping sound: '+oSound.sID);
    sm.stop(oSound.sID);
    if (!isTouchDevice) { // iOS 4.2+ security blocks onfinish() -> playNext() if we set a .src in-between(?)
      sm.unload(oSound.sID);
    }
  };

  this.getDurationEstimate = function(oSound) {
    if (oSound.instanceOptions.isMovieStar) {
      return (oSound.duration);
    } else {
      return (!oSound._data.metadata || !oSound._data.metadata.data.givenDuration ? (oSound.durationEstimate||0) : oSound._data.metadata.data.givenDuration);
    }
  };

  this.createVUData = function() {

    var i=0, j=0,
      canvas = vuDataCanvas.getContext('2d'),
      vuGrad = canvas.createLinearGradient(0, 16, 0, 0),
      bgGrad, outline;

    vuGrad.addColorStop(0,'rgb(0,192,0)');
    vuGrad.addColorStop(0.30,'rgb(0,255,0)');
    vuGrad.addColorStop(0.625,'rgb(255,255,0)');
    vuGrad.addColorStop(0.85,'rgb(255,0,0)');
    bgGrad = canvas.createLinearGradient(0, 16, 0, 0);
    outline = 'rgba(0,0,0,0.2)';
    bgGrad.addColorStop(0,outline);
    bgGrad.addColorStop(1,'rgba(0,0,0,0.5)');
    for (i=0; i<16; i++) {
      self.vuMeterData[i] = [];
    }
    for (i=0; i<16; i++) {
      for (j=0; j<16; j++) {
        // reset/erase canvas
        vuDataCanvas.setAttribute('width',16);
        vuDataCanvas.setAttribute('height',16);
        // draw new stuffs
        canvas.fillStyle = bgGrad;
        canvas.fillRect(0,0,7,15);
        canvas.fillRect(8,0,7,15);
        /*
        // shadow
        canvas.fillStyle = 'rgba(0,0,0,0.1)';
        canvas.fillRect(1,15-i,7,17-(17-i));
        canvas.fillRect(9,15-j,7,17-(17-j));
        */
        canvas.fillStyle = vuGrad;
        canvas.fillRect(0,15-i,7,16-(16-i));
        canvas.fillRect(8,15-j,7,16-(16-j));
        // and now, clear out some bits.
        canvas.clearRect(0,3,16,1);
        canvas.clearRect(0,7,16,1);
        canvas.clearRect(0,11,16,1);
        self.vuMeterData[i][j] = vuDataCanvas.toDataURL('image/png');
        // for debugging VU images
        /*
        var o = document.createElement('img');
        o.style.marginRight = '5px';
        o.src = self.vuMeterData[i][j];
        document.documentElement.appendChild(o);
        */
      }
    }

  };

  this.testCanvas = function() {
    // canvas + toDataURL();
    var c = document.createElement('canvas'),
        ctx = null, ok;
    if (!c || typeof c.getContext === 'undefined') {
      return null;
    }
    ctx = c.getContext('2d');
    if (!ctx || typeof c.toDataURL !== 'function') {
        return null;
    }
    // just in case..
    try {
        ok = c.toDataURL('image/png');
    } catch(e) {
      // no canvas or no toDataURL()
      return null;
    }
    // assume we're all good.
    return c;
  };

  this.initItem = function(oNode) {
    if (!oNode.id) {
      oNode.id = 'pagePlayerMP3Sound'+(self.soundCount++);
    }
    self.addClass(oNode,self.css.sDefault); // add default CSS decoration
  };

  this.initUL = function(oULNode) {
    // set up graph box stuffs
    if (sm.flashVersion >= 9) {
        self.addClass(oULNode,self.cssBase);
    }
  };

  this.init = function(oConfig) {

    if (oConfig) {
      // allow overriding via arguments object
      sm._writeDebug('pagePlayer.init(): Using custom configuration');
      this.config = this._mergeObjects(oConfig,this.config);
    } else {
      sm._writeDebug('pagePlayer.init(): Using default configuration');
    }

    var i, spectrumBox, sbC, oF, oClone, oTiming;

    // apply externally-defined override, if applicable
    this.cssBase = []; // optional features added to ul.playlist

    // apply some items to SM2
    sm.useFlashBlock = true;

    if (sm.flashVersion >= 9) {

      sm.useMovieStar = this.config.useMovieStar; // enable playing FLV, MP4 etc.
      sm.defaultOptions.usePeakData = this.config.usePeakData;
      sm.defaultOptions.useWaveformData = this.config.useWaveformData;
      sm.defaultOptions.useEQData = this.config.useEQData;

      if (this.config.usePeakData) {
        this.cssBase.push('use-peak');
      }

      if (this.config.useWaveformData || this.config.useEQData) {
        this.cssBase.push('use-spectrum');
      }

      this.cssBase = this.cssBase.join(' ');

      if (this.config.useFavIcon) {
        vuDataCanvas = self.testCanvas();
        if (vuDataCanvas && supportsFavicon) {
          // these browsers support dynamically-updating the favicon
          self.createVUData();
        } else {
          // browser doesn't support doing this
          this.config.useFavIcon = false;
        }
      }

    } else if (this.config.usePeakData || this.config.useWaveformData || this.config.useEQData) {

      sm._writeDebug('Page player: Note: soundManager.flashVersion = 9 is required for peak/waveform/EQ features.');

    }

    controlTemplate = document.createElement('div');

     controlTemplate.innerHTML = [

      // control markup inserted dynamically after each page player link
      // if you want to change the UI layout, this is the place to do it.

      '  <div class="controls">',
      '   <div class="statusbar">',
      '    <div class="loading"></div>',
      '    <div class="position"></div>',
      '   </div>',
      '  </div>',

      '  <div class="timing">',
      '   <div id="sm2_timing" class="timing-data">',
      '    <span class="sm2_position">%s1</span> / <span class="sm2_total">%s2</span>',
      '   </div>',
      '  </div>',

      '  <div class="peak">',
      '   <div class="peak-box"><span class="l"></span><span class="r"></span></div>',
      '  </div>',

      ' <div class="spectrum-container">',
      '  <div class="spectrum-box">',
      '   <div class="spectrum"></div>',
      '  </div>',
      ' </div>'

    ].join('\n');

    if (sm.flashVersion >= 9) {

      // create the spectrum box ish
      spectrumContainer = self.select('spectrum-container',controlTemplate);

      // take out of template, too
      spectrumContainer = controlTemplate.removeChild(spectrumContainer);

      spectrumBox = self.select('spectrum-box',spectrumContainer);

      sbC = spectrumBox.getElementsByTagName('div')[0];
      oF = document.createDocumentFragment();
      oClone = null;
      for (i=256; i--;) {
        oClone = sbC.cloneNode(false);
        oClone.style.left = (i)+'px';
        oF.appendChild(oClone);
      }
      spectrumBox.removeChild(sbC);
      spectrumBox.appendChild(oF);

    } else {

      // flash 8-only, take out the spectrum container and peak elements
      controlTemplate.removeChild(self.select('spectrum-container',controlTemplate));
      controlTemplate.removeChild(self.select('peak',controlTemplate));

    }

    self.oControls = controlTemplate.cloneNode(true);

    oTiming = self.select('timing-data',controlTemplate);
    self.strings.timing = oTiming.innerHTML;
    oTiming.innerHTML = '';
    oTiming.id = '';

    function doEvents(action) { // action: add / remove

      _event[action](document,'click',self.handleClick);

      if (!isTouchDevice) {
        _event[action](document,'mousedown',self.handleMouseDown);
        _event[action](document,'mouseup',self.stopDrag);
      } else {
        _event[action](document,'touchstart',self.handleMouseDown);
        _event[action](document,'touchend',self.stopDrag);
      }

      _event[action](window, 'unload', cleanup);

    }

    cleanup = function() {
      doEvents('remove');
    };

    doEvents('add');

    sm._writeDebug('pagePlayer.init(): Ready',1);

    if (self.config.autoStart) {
      // grab the first ul.playlist link
      pl.handleClick({target:pl.getByClassName('playlist', 'ul')[0].getElementsByTagName('a')[0]});
    }

  };

}

soundManager.useFlashBlock = true;

soundManager.onready(function() {
  pagePlayer = new PagePlayer();
  pagePlayer.init(typeof PP_CONFIG !== 'undefined' ? PP_CONFIG : null);
});
// Theme JavaScript goes here

jQuery(document).ready(function() {
	jQuery("section.main-content").fitVids();
	jQuery("section.video-main-content").fitVids();
	jQuery("#menu-expand").click(function() {
		var menu = jQuery('header nav[role="navigation"]');
		if (menu.hasClass('menu-hide')) {
			menu.slideDown(400, function() {
				jQuery(this).removeClass('menu-hide').attr('style', '');
				jQuery("#menu-expand").text(hide_text);
			});
		} else {
			menu.slideUp(400, function() {
				jQuery(this).addClass('menu-hide').attr('style', '');
				jQuery("#menu-expand").text(show_text);
			});
		}
	});
});
// Regular theme JavaScript goes here
;
