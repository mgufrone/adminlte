module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssUrlRewrite: {
      fontAwesome: {
        src: "public/AdminLTE/css/font-awesome.min.css",
        dest: "cached/font-awesome.min.css",
        options: {
          skipExternal: true,
          rewriteUrl: function(url, options, dataURI) {
            var path = url.replace('public/AdminLTE/', '');
            return './../AdminLTE/'+path;
          }
        }
      },
      bootstrap: {
        src: "public/AdminLTE/css/bootstrap.min.css",
        dest: "cached/bootstrap.min.css",
        options: {
          skipExternal: true,
          rewriteUrl: function(url, options, dataURI) {
            var path = url.replace('public/AdminLTE/', '');
            return './../AdminLTE/'+path;
          }
        }
      },
      ionicons: {
        src: "public/AdminLTE/css/ionicons.min.css",
        dest: "cached/ionicons.min.css",
        options: {
          skipExternal: true,
          rewriteUrl: function(url, options, dataURI) {
            var path = url.replace('public/AdminLTE/', '');
            return './../AdminLTE/'+path;
          }
        }
      },
      datatablesBootstrap: {
        src: "public/AdminLTE/css/datatables/dataTables.bootstrap.css",
        dest: "cached/dataTables.bootstrap.css",
        options: {
          skipExternal: true,
          // baseDir: 'public/AdminLTE/css/datatables',
          rewriteUrl: function(url, options, dataURI) {
            var path = url.replace('public/AdminLTE/css/datatables/', '');
            return './../AdminLTE/css/datatables/'+path;
          }
        }
      },
    },
    concat: {
      options: {
        separator: "\n\r"
      },
      dist: {
        src: [

          "public/AdminLTE/js/jquery-ui-1.10.3.min.js",
          "public/AdminLTE/js/bootstrap.min.js",
          "public/AdminLTE/js/plugins/morris/morris.min.js",
          "public/AdminLTE/js/plugins/sparkline/jquery.sparkline.min.js",
          "public/AdminLTE/js/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js",
          "public/AdminLTE/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js",
          "public/AdminLTE/js/plugins/jqueryKnob/jquery.knob.js",
          "public/AdminLTE/js/plugins/daterangepicker/daterangepicker.js",
          "public/AdminLTE/js/plugins/fullcalendar/fullcalendar.min.js",
          "public/AdminLTE/js/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js",
          "public/AdminLTE/js/plugins/iCheck/icheck.min.js",
          "public/AdminLTE/js/AdminLTE/app.js",
          "public/js/app.js",
          // 'public/js/vendor/bootstrap-switch.min.js',
        ],
        dest: 'dist/<%= pkg.name %>.js'
      },
      css: {
        src: [
            "cached/bootstrap.min.css",
            "cached/font-awesome.min.css",
            "cached/ionicons.min.css",
            "public/AdminLTE/css/morris/morris.css",
            "public/AdminLTE/css/jvectormap/jquery-jvectormap-1.2.2.css",
            "public/AdminLTE/css/fullcalendar/fullcalendar.css",
            "public/AdminLTE/css/daterangepicker/daterangepicker-bs3.css",
            "public/AdminLTE/css/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css",
            "public/AdminLTE/css/AdminLTE.css",
            "cached/dataTables.bootstrap.css",
            "public/css/AdminLTE.css",
          // 'public/css/vendor/bootstrap-switch.min.css',
        ],
        dest: 'public/css/<%= pkg.name %>.min.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: [
        'Gruntfile.js',
        // 'public/js/directives/ng-bs-daterangepicker.min.js',
        // 'public/js/vendor/angular-file-upload.js',
        // 'public/js/vendor/bootstrap-dialog.js',
        // 'public/js/vendor/datatable-helper.js',
        'public/js/directives/date-range.js',
        'public/js/directives/export-page.js',
        'public/js/controllers/export.js',
        'public/js/controllers/mutation.js',
        'public/js/controllers/import.js',
        'public/js/controllers/deposit.js',
        'public/js/controllers/deposit-reseller.js',
        'public/js/billing-manager.js',
      ],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-css-url-rewrite');
  grunt.registerTask('cssUrlRewriters','CSS URL Rewriter', function(){
    var file_path = grunt.config.process(grunt.config.data.concat.css.dest);
    var content = grunt.file.read(file_path);
    var regex = /\@import\surl\((.*)\)\;/igm;
    var loaded_fonts = content.toString().match(regex);
    content = content.toString().replace(regex, '');
    content = loaded_fonts.join("\n")+content.toString();

    grunt.file.write(file_path, content);
  });
  grunt.registerTask('default', ['jshint', 'cssUrlRewrite', 'concat', 'uglify', 'cssUrlRewriters']);

};
