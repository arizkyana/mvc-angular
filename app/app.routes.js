var routes = angular.module('mvc.routes', ['ui.router', 'oc.lazyLoad']);

routes.config(['$stateProvider',
    function($stateProvider) {
        /**
         * [loadTemplate description]
         * @param  {[type]} $stateParams [description]
         * @return {[type]}              [description]
         */
    	var loadTemplate = function($stateParams){
            var template = 'components/' + $stateParams.dir + '/';
            template += $stateParams.module + '/' + $stateParams.method;
    		return template + '.html';
    	}
        /**
         * [loadController description]
         * @param  {[type]} $stateParams [description]
         * @return {[type]}              [description]
         */
        var loadController = function($stateParams){
            return $stateParams.module + S('_' + $stateParams.method + '_').camelize().s + 'Ctr';
        }
        /**
         * [resolveController description]
         * @type {Array}
         */
        var resolveController = ['$ocLazyLoad', '$stateParams',
            function($ocLazyLoad, $stateParams) {
                var name = 'mvc.' + $stateParams.dir + '.' + $stateParams.module + '.controller',
                    file = 'components/' + $stateParams.dir + '/' + $stateParams.module + '/method/' + $stateParams.method + '.js' ;
                console.log({
                    name: name,
                    file: file,
                })
                return $ocLazyLoad.load({
                    'name': name,
                    'files': [file]
                });
            }
        ];
        /**
         * [sticky description]
         * @type {Boolean}
         */
        $stateProvider.state('module', {
            sticky: true,
            url: '/mvc/:dir/:module',
            templateUrl: loadTemplate,
            controllerProvider: loadController,
            resolve: {
                loadController: resolveController,
                // loadService: resolveService

            }
        });
        /**
         * [sticky description]
         * @type {Boolean}
         */
        $stateProvider.state('method', {
            sticky: true,
            url: '/mvc/:dir/:module/:method',
            templateUrl: loadTemplate,
            controllerProvider: loadController,
            resolve: {
                loadController: resolveController,
                // loadService: resolveService

            }
        });
        /**
         * [sticky description]
         * @type {Boolean}
         */
        $stateProvider.state('param', {
            sticky: true,
            url: '/mvc/:dir/:module/:method/:param',
            templateUrl: loadTemplate,
            controllerProvider: loadController,
            resolve: {
                loadController: resolveController,
                // loadService: resolveService

            }
        });

    }
]);

/**
 * [description]
 * @param  {[type]} $urlRouterProvider) {                   $urlRouterProvider.otherwise('/mvc/jobsheet/main/list');        $urlRouterProvider.when('/', '/mvc/jobsheet/main/list');    }] [description]
 * @return {[type]}                     [description]
 */
routes.config(['$urlRouterProvider',
    function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/mvc/home/profile/main');
        $urlRouterProvider.when('/', '/mvc/home/profile/main');
    }
]);