var app = angular.module('doApp', ['ngRoute', 'firebase'])

app.constant('qbb', {
	url: "https://quitbeingbored.firebaseio.com/"
})

app.config(function($routeProvider) {
	$routeProvider
	.when('/main', {
		templateUrl: 'main/mainTmpl.html',
		controller: 'mainCtrl',
		resolve: {
			ideasRef: function(services) {
				return services.getIdeas();
			}
		}
	})
	.when('/myList/:uid', {
		templateUrl: 'myList/myListTmpl.html',
		controller: 'myListCtrl',
		resolve: {
			listRef: function(services, $route) {
				return services.getList($route.current.params.uid);
			},
			userRef: function(services, $route) {
				return services.getUser($route.current.params.uid);
			}
		}
	})
	.when('/browse', {
		templateUrl: 'browse/browseTmpl.html',
		controller: 'browseCtrl',
		resolve: {
			completedRef: function(services) {
				return services.getCompleted();
			}
		}
	})
	.when('/regLog', {
		templateUrl: 'regLog/regLogTmpl.html',
		controller: 'regLogCtrl'
	})
	.otherwise({
		redirectTo: '/main'
	})
})