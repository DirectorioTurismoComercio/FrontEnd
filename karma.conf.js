// Karma configuration
// Generated on Mon Jan 25 2016 20:55:31 GMT+0000 (UTC)

module.exports = function (config) {
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
            'node_modules/satellizer/satellizer.min.js',
            'public/components/angular-route/angular-route.min.js',
            'public/components/angular-resource/angular-resource.min.js',
            'node_modules/angular-animate/angular-animate.min.js',
            'public/components/angular-material/angular-material.min.js',
            'public/components/angular-aria/angular-aria.min.js',
            'public/js/directives/pagination/dirPagination.js',
            'public/components/angular-messages/angular-messages.min.js',
            'public/components/angular-cookies/angular-cookies.min.js',
            'public/components/angular-sanitize/angular-sanitize.min.js',
            'public/components/videogular/videogular.min.js',
            'public/components/lodash/lodash.js',
            'public/components/angularjs-filters/filters.js',
            'public/components/angular-simple-logger/dist/angular-simple-logger.min.js',
            'public/components/angular-google-maps/dist/angular-google-maps.min.js',
            'test/specHelpers.js',
            'test/specConstants.js',
            'public/js/map/map.js',
            'public/js/map/map.controller.js',
            'public/js/home/home.js',
            'public/js/home/home.controller.js',
            'public/js/businessBrowser/businessBrowser.controller.js',
            'public/js/**/*.js',
            'test/**/*Spec.js',
            'public/templates/directives/side-bar.html'
        ],


        // list of files to exclude
        exclude: [
            'test/e2e/*'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'public/templates/directives/side-bar.html': 'ng-html2js'
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'public/'
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
