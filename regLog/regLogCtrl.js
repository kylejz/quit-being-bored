var app = angular.module('doApp');

app.controller('regLogCtrl', function($scope, qbb, services, $firebaseAuth, $location) {

	// toggling the forms

	$scope.signInFormShow = false;
	$scope.registerFormShow = false;
	$scope.changeShow1 = function() {
		$scope.signInFormShow = !$scope.signInFormShow;
		$scope.registerFormShow = false;
	}
	$scope.changeShow2 = function() {
		$scope.registerFormShow = !$scope.registerFormShow;
		$scope.signInFormShow = false;
	}

	// logging in, registering, etc

	var ref = new Firebase(qbb.url);
	// $scope.authObj = $firebaseAuth(ref);
	// console.log($scope.authObj)

	$scope.authObj = services.getAuthObj();

	$scope.registerUser = function(obj) {
		$scope.authObj.$createUser({
			email: obj.email,
			password: obj.password
		}).then(function(response) {
			ref.child('users').child(response.uid).set({
				name: obj.name
			});
			$scope.signInUser(obj);
		}, function(err){
			console.log(err);
		})
	}

	$scope.signInUser = function(obj) {
		$scope.authObj.$authWithPassword({
			email: obj.email,
			password: obj.password
		}).then(function(response) {
			$location.path('/main')
		})
	}

})