module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {
        sourceMap: true,
        presets: ['babel-preset-es2015']
      },
      dist: {
          files: [{
              "expand": true,
              "cwd": "src/",
              "src": ["**/*.js"],
              "dest": "app/",
              "ext": ".js"
          }]
      }
    },
    sass: {
      options: { 
        style: 'compressed',
        noCache:true,
        update:true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/public/stylesheets/',
          src: ['style.scss'],
          dest: 'app/public/stylesheets/',
          ext: '.css'
        }]
      }
    },
    watch: {
      scripts: {
          files: ['src/*.js','src/*/*.js'],
          tasks: ['babel'],
          options: {
            debounceDelay: 250,
          }
      },
      css:{
        files: ['src/public/stylesheets/style.scss'],
        tasks: ['sass'],
        options: {
          debounceDelay: 250,
        }
      }
    }
  });

  // 加载任务插件
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 默认被执行的任务列表。
  grunt.registerTask('default','watch');

};