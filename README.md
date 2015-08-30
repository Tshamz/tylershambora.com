...this project needs a little love

# tylershambora.com #

Check out [tylershambora.com](http://tylershambora.com) for an up to date, live version of the site.

## About ##

No full page reloads, loads new content in via ajax, most of the animations are done using CSS3 transitions/animations, stylesheets are written using SCSS, fully responsive and built mobile-first, modular javascript, uses Grunt to: work locally with livereload/grunt-contrib-connect, concatenate and minify CSS & JavaScript, optimize images, and create a ready to go dist directory. (most of) The JS is written in a modular pattern, the scss is a little rusty but written in a (somewhat) digestible manner, and apart from mainstays like JQuery (fleshed out and scaled down custom build) and Modernizer (also a custom build, ooooooh! ahhhhhhh!), there are no frameworks, libraries, spaceships, magic spells, or voodoo, being used.

~**NOTE:** This repository is for review purposes only, it's not meant to be cloned. This means it doesn't include:
* A package.json file
* A Gruntfile
* compressed image files
* compressed font files
* compiled & minified .css files (main.css, enhanced.css)
* concatenated & minified .js modules (main.js)
* concatenated & minified .js vendor files (jquery.js, modernizr.js ~> vendor.js)
* minified versions of feature-test.js, gallery-info.json~*

\*Scratch that, I'm gonna try to some automatic deployment action so everything goes on github!

## Goals/TODO ##

*  ~~Would like to minify CSS & JS~~
*  ~~Convert all CSS to SCSS~~
*  ~~Trying to get all resources as small as possible in order to reduce amount of bandwidth used on mobile~~
*  ~~PreLoad Images~~
*  ~~Shift my attention to work-flow~~
*  ~~Add content for the #entrance hash~~
*  ~~Update each portfolio gallery item~~
*  ~~Cleaning up the super big slider~~
*  ~~Markup for the site lives in three different places: index.html, subPagesDocument.html, and main.js.~~
*  ~~Rewrite all the copy associated with the gallery items so they are the correct length~~
*  ~~Build a better light box~~
*  ~~Look into more about support for pointer-events~~
*  ~~Rivers in text~~
*  ~~Vertically align gallery images in portrait mode~~
*  Improve a11y
*  Set up filerev to rename feature-test.js, gallery-info.json, to uncache the new build files

kbye.
