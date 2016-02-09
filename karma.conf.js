// Karma configuration
// Generated on Mon Jan 25 2016 20:55:31 GMT+0000 (UTC)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'public/components/angular-route/angular-route.min.js',
      'public/components/angular-resource/angular-resource.min.js',
      //'public/js/controllers/user/user-controller.js',
      'public/components/angular-animate/angular-animate.min.js',
      'public/components/angular-material/angular-material.min.js',
      'public/components/angular-aria/angular-aria.min.js',
      'public/js/directives/pagination/dirPagination.js',
      'public/components/angular-messages/angular-messages.min.js',
      'public/components/angular-cookies/angular-cookies.min.js',
      'public/components/angular-sanitize/angular-sanitize.min.js',
      'public/components/videogular/videogular.min.js',
      'public/js/**/*.js',
      'test/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
