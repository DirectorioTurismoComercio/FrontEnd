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
            "http://maps.googleapis.com/maps/api/js?sensor=false&language=en",
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/satellizer/satellizer.min.js',
            'public/components/satellizer/satellizer.js',
            'public/components/angular-route/angular-route.js',
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
            'public/components/angular-translate/angular-translate.min.js',
            'public/components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
            'public/components/angular-google-places-autocomplete/dist/autocomplete.min.js',
            'public/components/angularjs-geolocation/dist/angularjs-geolocation.min.js',
            'public/components/ng-tags-input/ng-tags-input.min.js',
            'public/components/angular-business-hours/dist/angular-business-hours.js',
            'public/components/angular-click-outside/clickoutside.directive.js',
            'public/components/angular-wizard/dist/angular-wizard.min.js',
            'public/components/flow.js/dist/flow.min.js',
            'public/components/ng-flow/dist/ng-flow.min.js',
            'public/components/ng-dialog/js/ngDialog.min.js',
            'public/components/angular-touch/angular-touch.js',
            'public/components/angular-carousel/dist/angular-carousel.js',
            'public/components/ng-clamp/ng-clamp.js',
            'public/components/checklist-model/checklist-model.js',
            'public/components/jquery/dist/jquery.min.js',
            'public/components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
            'public/components/ng-scrollbars/dist/scrollbars.min.js',
            'public/components/slick-carousel/slick/slick.js',
            'public/components/angular-slick/dist/slick.js',
            'public/components/angucomplete-alt/angucomplete-alt.js',
            'public/components/angucomplete-alt/dist/angucomplete-alt.min.js',
            'public/components/angular-images-resizer/src/resize.js',
            'public/components/angular-images-resizer/src/resize-service.js',
            'public/components/angular-input-stars-directive/angular-input-stars.js',
            'test/specHelpers.js',
            'test/specConstants.js',
            'public/js/DAO/dao.module.js',
            'public/js/DAO/municipalities.dao.js',
            'public/js/footer/footer.directive.js',
            'public/js/footer/footer.controller.js',
            'public/js/map/map.js',
            'public/js/map/map.controller.js',
            'public/js/home/home.js',
            'public/js/home/home.controller.js',
            'public/js/registerSite/registerSite.js',
            'public/js/registerTrader/registerTrader.js',
            'public/js/registerTrader/registerTrader.controller.js',
            'public/js/municipality/municipality.js',
            'public/js/vote/vote.js',
            'public/js/vote/vote.controller.js',
            'public/js/municipality/registerMunicipalityAccount/registerMunicipality.controller.js',
            'public/js/municipality/loginMunicipality/loginMunicipality.controller.js',
            'public/js/municipality/registerMunicipalityInformation/municipalityInfo/municipalityInfo.controller.js',
            'public/js/municipality/registerMunicipalityInformation/municipalityInformation.service.js',
            'public/js/municipality/registerMunicipalityInformation/municipalityLocation/municipalityLocation.controller.js',
            'public/js/municipality/registerMunicipalityInformation/municipalityPhotos/municipalityPhotos.controller.js',
            'public/js/municipality/municipalityRoute/municipalityRoute.controller.js',
            'public/js/businessBrowser/businessBrowser.controller.js',
            'public/js/siteAndTownSaver/siteAndTownService.service.js',
            'public/js/accountInfo/accountInfo.js',
            'public/js/login/login.js',
            'public/js/howItWorks/howItWorks.js',
            'public/js/howItWorks/howItWorks.controller.js',
            'public/js/custom_components/pgClamp/clamp.js',
            'public/js/utils/utils.module.js',
            'public/js/utils/image.service.js',
            'public/js/interceptor.js',
            'public/js/forgotPassword/forgotPassword.js',
            'public/js/forgotPassword/forgotPassword.Controller.js',
            'public/js/**/*.js',
            'test/**/*Spec.js',
            'public/templates/directives/side-bar.html'
        ],


        // list of files to exclude
        exclude: [
            'test/e2e/*',
            'public/i18n/locale-en.json',
            'public/i18n/locale-es.json',
            'public/app-i18n-loader.js'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'public/templates/directives/side-bar.html': 'ng-html2js',
            //'public/js/**/*.js':['coverage']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'public/'
        },

        /*coverageReporter: {
            type: 'html',
            dir: 'coverage/',
            file : 'coverage.txt'
        },*/



        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        //reporters: ['progress', 'coverage'],
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
