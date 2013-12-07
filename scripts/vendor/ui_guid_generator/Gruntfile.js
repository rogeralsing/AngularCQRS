module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // jasmine: {
    //   unit: {
    //     src: "dist/ui-guid-generator.js",
    //     options: {
    //       keepRunner: true,
    //       specs: 'spec/*_spec.js',
    //       // vendor: 'spec/vendor/*.js'
    //       helpers: ['spec/**/**_fixture.js']
    //     }
    //   }
    // },

    clean: {
      tmp: ['_tmp']
    },

    uglify: {
      javascripts: {
        files: {
          'dist/ui-guid-generator.min.js': [
            'dist/ui-guid-generator.js'
          ]
        }
      }
    },

    coffee: {
      compile: {
        files: {
          'dist/ui-guid-generator.js': 'src/ui-guid-generator.coffee'
        },
        options: {
          bare: true
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/ui-guid-generator.coffee', 'spec/**/**.js'],
        tasks: ['compile'],
        options: {
          atBegin: true
        }
      }
    },

    jshint: {
      all: 'dist/ui-guid-generator.js',
      options: {
        reporter: 'jslint',
        reporterOutput: '../javascriptslint.xml'
      }
    }

  });

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  grunt.registerTask('compile', ['clean', 'coffee']);
  grunt.registerTask('build', ['compile', 'uglify']);
  grunt.registerTask('test', ['compile', 'jasmine:unit']);

};
