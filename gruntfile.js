const sass = require('node-sass');

module.exports = grunt => {
  // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  // Project configuration
  grunt.initConfig({
    // Compilation
    sass: {
      options: {
        implementation: sass,
        sourceMap: true
      },
      dist: {
        files: {
          './dist/css/main.css': './src/scss/main.scss'
        }
      }
    },
    postcss: {
      options: {
        map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'dist/maps/' // ...to the specified directory
        },
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'dist/css/*.css'
      }
    },
    browserify: {
      dist: {
        files: {
          // destination for transpiled js : source js
          'dist/js/app.js': 'src/js/index.js'
        },
        options: {
          transform: [['babelify', {presets: "es2015"}]],
          browserifyOptions: {
            debug: true
          }
        }
      }
    },
    // Linting
    sasslint: {
      options: {
        configFile: 'config/sass-lint.yml',
      },
      target: ['./src/scss/**/*.scss']
    },
    // Helper Tasks
    watch: {
      scss: {
        files: './src/scss/**/*.scss',
        tasks: ['sasslint', 'sass', 'postcss']
      },
      scripts: {
        files: './src/js/**/*.js',
        tasks: ['browserify']
      },
      configFiles: {
        files: ['./gruntfile.js', 'config/*'],
        options: {
          reload: true
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            './src/scss/**/*.scss',
            './src/js/**/*.js',
            './**/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./",
            index: "index.html"
          }
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['sass', 'postcss', 'browserify']);

  // Dev tasks
  grunt.registerTask('dev', ['sasslint', 'default']);
  grunt.registerTask('serve', ['dev', 'browserSync', 'watch']);

};
