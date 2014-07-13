module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Configure Grunt
  grunt.initConfig({
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
      all: {
        files: grunt.file.expandMapping(["app/js/main.js", "app/js/feature-test.js"], "", {
          ext: '.min.js',
          extDot: 'last'
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

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 7
        },
        files: [{
          expand: true,
          cwd: 'app/img',
          src: ['**/*.{png,jpg}'],
          dest: 'app/dist/img'
        }]
      }
    },

    watch: {
      all: {
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
        tasks: ["sass"]
      }
    },

    copy: {
      main: {
        files: [
          { expand: true, cwd: 'app/', src: '*.{html,pdf,php,manifest}', dest: 'app/dist/' },
          { expand: true, cwd: 'app/css/', src: '*.css', dest: 'app/dist/css/' },
          { expand: true, cwd: 'app/js/', src: '*.{js,json}', dest: 'app/dist/js/' },
          { expand: true, cwd: 'app/font/', src: '*.{ttf,woff,eot,svg}', dest: 'app/dist/font/' }
        ]
      }
    },

    open: {
      all: {
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

  grunt.registerTask('build', [
    'uglify',
    'sass',
    'copy'
  ]);

  grunt.registerTask('minimg', [
    'imagemin'
  ]);

};