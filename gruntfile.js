module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["./src/less/"],
                    compress: false,
                    yuicompress: false,
                    optimization: 2,
                    spawn: true
                },
                files: {
                    "./src/css/style.css": "./src/less/main-style.less"
                }
            }
        },
        watch: {
            styles: {
                files: ['./src/less/**/*.less', './src/less/**/*.css'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('default', ['less', 'watch']);
};