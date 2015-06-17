var app = angular.module('doApp');

app.controller('mainCtrl', function($scope, ideasRef, qbb, services, $location, $firebaseObject, $firebaseArray, $firebaseAuth) {

//show the new idea form

	$scope.toggle = false;

	$scope.changeShow = function() {
		$scope.toggle = !$scope.toggle;
	}

	//submit an idea

	$scope.ideas = $firebaseArray(ideasRef);

	$scope.submitIdea = function(idea) {
		$scope.ideas.$add({
			text: idea
		});
		$scope.adventureIdea = '';
	}

	//getting and showing ideas

	$scope.suggestion = '';

	$scope.resetSuggestion = function() {
		$scope.suggestion = '';
	}

	$scope.getIdea = function() {
		$scope.suggestion = $scope.ideas[Math.floor(Math.random() * ($scope.ideas.length))].text
	}

	//user data

	$scope.authObj = services.getAuthObj();
	
	$scope.authObj.$onAuth(function(response) {
		if (response) {
			$scope.ideasArray = $firebaseArray(new Firebase(qbb.url + '/users/' + response.uid + '/ideaList'));
			$scope.authData = response;
		} else {
			$scope.authData = false;
		}
	})

	$scope.acceptSuggestion = function(text) {
		$scope.ideasArray.$add({
			idea: text,
			show: false
		});
		console.log(text);
		console.log($scope.ideasArray);
		$location.path('/myList/' + $scope.authData.uid)
	}



})