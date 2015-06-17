var app = angular.module('doApp');

app.controller('headerCtrl', function($scope, services, qbb, $location, $firebaseAuth) {

	$scope.authObj = services.getAuthObj();

	$scope.authObj.$onAuth(function(authData) {
		if (authData) {
			$scope.authIs = true;
			$scope.authData = authData;
		} else {
			$scope.authIs = false;
			$scope.authData = false;
		}
	})

	$scope.navigateToList = function() {
		if ($scope.authData) {
			$location.path('/myList/' + $scope.authData.uid)
		} else {
			alert('Please sign in.')
		}
	}

	$scope.navigateToReg = function() {
		$location.path('/regLog')
	}

	$scope.navigateToMain = function() {
		$location.path('/main')
	}

	$scope.navigateToBrowse = function() {
		$location.path('/browse')
	}
})