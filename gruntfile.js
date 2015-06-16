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
                src: 'www/build/src/js/main.js',
                dest: 'www/public/scripts/main.js'
            }
        },

        babel: {
            options: {
                sourceMap:true
            },
            dist: {
                files: [
                    {
                      expand: true,
                      cwd: 'www/src/js',
                      src: ['**/*.js'],
                      dest: 'www/build/src/js',
                      ext: '.js'
                    }
                ]
            }
        },

        react: {
            dist: {
                files: [
                    {
                      expand: true,
                      cwd: 'www/build/src/js',
                      src: ['**/*.js'],
                      dest: 'www/build/src/js',
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


    require("load-grunt-tasks")(grunt);

    grunt.registerTask('default', ['js', 'sass']);
    grunt.registerTask('js', [
        'babel',
        'react',
        'browserify'
    ]);
}