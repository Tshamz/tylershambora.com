module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Configure Grunt
  grunt.initConfig({
    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: 8000,
          hostname: "0.0.0.0",
          bases: ["app"], // Replace with the directory you want the files served from
                          // Make sure you don't use `.` or `..` in the path as Express
                          // is likely to return 403 Forbidden responses if you do
                          // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
          livereload: true
        }
      }
    },

    uglify: {
      dist: {
        files: grunt.file.expandMapping(["app/js/main.js"], "", {
          rename: function(destBase, destPath) {
            return destBase + destPath.replace(".js", ".min.js");
          }
        })
      }
    },

    sass: {
      dev: {
        options: {
          style: "expanded"
        },
        files: {
          "app/css/style.css": "app/css/scss/style.scss",
          "app/css/enhanced.css": "app/css/scss/enhanced.scss"
        }
      },
      dist: {
        options: {
          style: "compressed"
        },
        files: {
          "app/css/style.min.css": "app/css/scss/style.scss",
          "app/css/enhanced.min.css": "app/css/scss/enhanced.scss"
        }
      }
    },

    // grunt-watch will monitor the projects files
    watch: {
      all: {
        // Replace with whatever file(s) you want to trigger the update from
        // Either as a String for a single entry
        // or an Array of String for multiple entries
        // You can use globing patterns like `css/**/*.css`
        // See https://github.com/gruntjs/grunt-contrib-watch#files
        files: ["app/index.html", "app/cache.manifest", "app/img/**/*.{png|jpg}", "app/img/*.{png|jpg}"],
        options: {
          livereload: true
        },
      },
      scripts: {
        files: ["app/js/main.js", "!app/js/main.min.js"],
        tasks: ["uglify"]
      },
      sass: {
        files: ["app/css/scss/*.scss"],
        tasks: ["sass:dev", "sass:dist"]
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    }
  });

  // Creates the `server` task
  grunt.registerTask('server', [
    'express',
    'open',
    'watch'
  ]);
};