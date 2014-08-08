module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          /*compress: true,
          yuicompress: true,*/
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "assets/css/spylight.min.css": "assets/less/spylight/spylight.less"
        }
      }
    },
    watch: {
      styles: {
        files: ['assets/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },
    // grunt-open will open your browser at the project's URL
    open: {
        all: {
            // Gets the port from the connect configuration
            path: 'http://localhost:9001/'
        }
    },
    connect: {
        server: {
            options: {
                port: 9001,
                base: '/Users/knope/code/fullwidth-carousel-with-video-pins'
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['connect', 'open', 'watch']);
};