module.exports = function(grunt) {

  "use strict";

  // Project configuration.
  grunt.initConfig({

    // path config
    pathConfig: {
      src:  'dev/src',
      dist: 'dist',
      test: 'dev/test'
    },

    // lint javascript file
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '!<%= pathConfig.src %>/assets/scripts/lib/*',
        '!Gruntfile.js',
        '<%= pathConfig.src %>/assets/scripts/{,*/}*.js',
        '<%= pathConfig.test %>/spec/{,*/}*.js'
      ]
    },

    // concat
    'concat': {
      dist: {
        src: [
          '<%= pathConfig.src %>/assets/scripts/a.js',
          '<%= pathConfig.src %>/assets/scripts/b.js'
        ],
        dest: '<%= pathConfig.src %>/assets/scripts/app-concat.js'
      }
    },

    // js minify
    'uglify': {
      dist: {
        files: {
          '<%= pathConfig.src %>/assets/scripts/app-min.js': [
            '<%= pathConfig.src %>/assets/scripts/app-concat.js'
          ]
        }
      }
    },

    // compass
    'compass': {
      dev: {
        options: {
          config: 'config.rb'
        }
      }
    },

    // styleguide
    'styleguide':{
      styledocco: {
        options: {
          framework: {
            name:'styledocco'
          },
          name: 'Style Guide',
          template: {
            include: ['plugin.css', 'app.js']
          }
        },
        files: {
          'docs': '<%= pathConfig.src %>/assets/styles/sass/**/*.sass'
        }
      }
    },

    // usemin
    usemin: {
      html: ['<%= pathConfig.dist %>/index.html']
    },

    // htmlmin
    htmlmin: {
      dist: {
        option: {
          collapseWhitespace: true
        },
        files: {
          '<%= pathConfig.dist %>/index.html': '<%= pathConfig.src %>/index.html'
        }
      }
    },

    // copy to dist
    copy: {
      main: {
        files: [
          {expand: true, cwd: '<%= pathConfig.src %>', src: ['**'], dest: 'dist/'}
        ]
      }
    }

    // html include

  });

  // load Tasks
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-styleguide');

  grunt.registerTask('common', ['jshint', 'compass']);
  grunt.registerTask('default', ['common', 'concat']);
  grunt.registerTask('dist', ['common', 'concat', 'uglify', 'copy', 'htmlmin', 'usemin']);
};
