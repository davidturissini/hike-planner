module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'www/public/styles/main.css': 'www/src/scss/main.scss'
                }
            }
        },

        browserify: {
            dist: {
                src: 'www/build/react/js/main.js',
                dest: 'www/public/scripts/main.js'
            }
        },

        react: {
            dist: {
                files: [
                    {
                      expand: true,
                      cwd: 'www/src/js',
                      src: ['**/*.js'],
                      dest: 'www/build/react/js',
                      ext: '.js'
                    }
                  ]
            }
        },

        watch: {
            js: {
                files: 'www/src/js/**/*.js',
                tasks: ['js'],
                options: {
                    interrupt: true
                }
            }
        }

    });


    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['js', 'sass']);
    grunt.registerTask('js', [
        'react',
        'browserify'
    ]);
}