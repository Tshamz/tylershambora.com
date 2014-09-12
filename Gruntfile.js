// (sorta) Generated (around) 2014-07-30 (partially) using generator-angular 0.9.5
'use strict';

// # Globbing
// One level down: 'test/spec/{,*/}*.js'
// All subfolders: 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    dist: 'dist'
  };

  // Configure Grunt
  grunt.initConfig({

    // Project settings
    config: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/*.{html,pdf,php,manifest}',
          '<%= config.app %>/fonts/*',
          '<%= config.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= config.app %>/scripts/{*.js,*.json,vendor/*.js}',
          '.tmp/styles/{,*/}*.css'
        ]
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.scss'],
        tasks: ['sass', 'autoprefixer']
      },
      scripts: {
        files: ['<%= config.app %>/scripts/{,*/}*.{js,json}'],
        tasks: ['concat']
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 1337,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static(appConfig.app)
            ];
          }
          //base: []
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= config.dist %>'
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/**/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      all: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['{,*/}*.scss'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles',
          src: ['*.css'],
          dest: '.tmp/styles'
        }]
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= config.dist %>/scripts/*.js',
          '<%= config.dist %>/styles/*.css',
          '<%= config.dist %>/fonts/*',
          '<%= config.dist %>/images/{*,icons/*,}.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= config.app %>/index.html',
      options: {
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      css: ['<%= config.dist %>/styles/*.css'],
      html: ['<%= config.dist %>/*.html'],
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/scripts',
          '<%= config.dist %>/styles'
        ]
      }
    },

    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/scripts',
          src: ['*.js'],
          dest: '.tmp/uglify'
        }]
      }
    },

    jsonmin: {
      dist: {
        options: {
          stripWhitespace: true,
          stripComments: true
        },
        files: {
          '.tmp/uglify/gallery-info.json' : '<%= config.app %>/scripts/gallery-info.json'
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: '<%= config.dist %>/images'
        }]
      },
      upgrade: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: '<%= config.app %>/images'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          src: [
            '*.{html,php,pdf,manifest}',
            'fonts/*'
          ],
          dest: '<%= config.dist %>',
        }]
      },
      scripts: {
        files: [{
          expand: true,
          cwd: '.tmp/uglify',
          src: ['*.{js,json}'],
          dest: '<%= config.dist %>/scripts'
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'sass',
      ],
      test: [
      ],
      dist: [
        'uglify:dist',
        'jsonmin:dist',
        'sass',
        'imagemin:dist'
      ]
    },

  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'autoprefixer',
    'copy:dist',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'filerev',
    'usemin',
    'copy:scripts',
    'clean:server'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
