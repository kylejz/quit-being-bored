var app = angular.module('doApp');

app.controller('myListCtrl', function($scope, qbb, services, listRef, userRef, $firebaseArray, $firebaseObject, $firebaseAuth) {

	//getting ideas

	$scope.ideasArray = $firebaseArray(listRef);

	//user authentication data

	$scope.authObj = services.getAuthObj();
	var authData = $scope.authObj.$getAuth();
	$scope.authData = authData;

	$scope.authObj.$onAuth(function(response) {
		if (response) {
			$scope.authData = response;
		} else {
			$scope.authData = false;
		}
	})

	//upload that chiz

	$scope.completedArray = $firebaseArray(new Firebase(qbb.url + '/completed/'));

	$scope.user = $firebaseObject(userRef);

	$scope.uploadImage = function(url, text, idea) {
		console.log(url, text, idea)
		if (!text) {
			text = null;
		}
		$scope.completedArray.$add({
			url: url,
			prompt: idea,
			comment: text,
			user: $scope.user.name,
			score: 0,
			posted: new Date().toISOString()
		}).then(function(response) {
			$scope.picture = '';
			$scope.comments = '';
			console.log(response);
		})
	}

})