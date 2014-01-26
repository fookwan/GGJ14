'use strict';

module.exports = function(grunt) {

  // Last updated: 11.14.2013; Michal Krupa
  // These plugins build a local production env.
  // Live testing yay...if it can't run on your computer it shouldn't be in the cloud

  // These tasks run automation tests against the codebase, js, and css
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');

  // This loads those tools automatically
  grunt.loadNpmTasks('grunt-contrib-watch');

  //This reboots the server when changes to the non front-facing javascript are made
  grunt.loadNpmTasks('grunt-nodemon');

  //Allows us to run nodemon and the rest of the config in the same tab
  grunt.loadNpmTasks('grunt-concurrent');

  // And then this reloads yours browser (assuming you have a livereload
  // extension enabled) when you make changes to the front end views
  grunt.loadNpmTasks('grunt-swig');

  // And this builds vendor css assets
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // And this builds vendor and custom js assets, yo.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // But this builds vendor and custom js into a concatenated file, for debugging (yo)
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: ['lib/vendor/js/**/*.js','public/js/**/*.js']
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      js_public: {
        src: ['public/js/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    csslint: {
      src: ['lib/css/**/*.css']
    },
    cssmin: {
      combine: {
        files: {
          'public/css/current-build.css': ['lib/vendor/css/**/*.css', 'lib/css/**/*.css']
        }
      }
    },
    nodemon: {
      dev: {
        options: {
          file: 'server.js',
          nodeArgs: ['--debug'],
          ignoredFiles: ['node_modules/**','lib/**', 'uploads/**'],
          env: {
            PORT: '3000'
          }
        }
      }
    },
    uglify: {
      options: {
        mangle: true
      },
      my_target: {
        files: {
          'public/js/current-build.js': ['lib/vendor/js/**/compile_*.js', 'lib/js/**/*.js']
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      build_css: {
        files: 'lib/**/*.css',
        tasks: ['cssmin']
      },
      build_js: {
        files: 'lib/**/*.js',
        tasks: ['concat']
      },
      views: {
        files: ['views/**/*.html']
      },
      css: {
        files: ['public/**/*.css'],
        tasks: ['csslint']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test']
      },
      js_test: {
        files: ['lib/js/**/*.js'],
        tasks: ['jshint']
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    concat: {
      dist: {
        src: ['lib/js/**/*.js'],
        dest: 'public/js/current-build.js',
      }
    }
  });


  // Default task.
  grunt.registerTask('default', ['jshint', 'csslint','cssmin', 'concat', 'concurrent']);

  grunt.registerTask('build', ['cssmin', 'uglify']);

};
