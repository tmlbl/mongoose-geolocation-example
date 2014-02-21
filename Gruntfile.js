module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      views: {
        files: ['app/views/**'],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: ['app/scripts/**'],
        tasks: ['concat:js', 'uglify:js'],
        options: {
          livereload: true
        }
      },
      styles: {
        files: ['app/styles/**'],
        tasks: ['sass', 'concat:css', 'cssmin'],
        options: {
          livereload: true
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/styles',
          src: ['*.scss'],
          dest: 'app/styles/compiled',
          ext: '.css'
        }]
      }
    },
    concat: {
      js: {
        src: ['app/scripts/*.js'],
        dest: 'public/js/main.js'
      },
      css: {
        src: ['app/styles/compiled/*.css'],
        dest: 'public/css/main.css'
      }
    },
    uglify: {
      js: {
        src: ['public/js/main.js'],
        dest: 'public/dist/main.min.js'
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'public/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'public/dist',
        ext: '.min.css'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['watch', 'sass']);
  grunt.registerTask('build', ['sass', 'concat', 'uglify']);
};