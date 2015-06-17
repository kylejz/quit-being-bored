var app = angular.module('doApp'); 

app.controller('browseCtrl', function($scope, qbb, services, completedRef, $firebaseArray, $firebaseAuth, $firebaseObject) {

	//get the info

	$scope.completedList = $firebaseArray(completedRef)

	console.log($scope.completedList)

	$scope.completedList.$loaded()
	.then(function(data) {
		console.log(data);
	})

	//likes function

	$scope.authObj = services.getAuthObj();
	var authData = $scope.authObj.$getAuth();
	console.log(authData)
	$scope.authData = authData;
	$scope.authObj.$onAuth(function(response) {
		if (response) {
			$scope.authData = response;
		} else {
			$scope.authData = false;
		}
	})

	var makeFirebase2 = function(id, uid) {
		return new Firebase(qbb.url + 'completed/' + id + '/votes/' + uid)
	} 

	$scope.upvote = function(item, uid) {
		var voteObj = $firebaseObject(makeFirebase2(item.$id, uid));
		voteObj.$loaded(function(){
			if(voteObj.upvote){
				voteObj.upvote = false;		
			} else {
				voteObj.upvote = true;
			}
			voteObj.$save().then(function(){
					if(voteObj.upvote){
						item.score++
					} else {
						item.score--
					}
					$scope.completedList.$save(item)
			})
		})
		
	}

	//toggle view options

	$scope.newest = false;
	$scope.coolest = false;

	$scope.changeNew = function() {
		$scope.newest = !$scope.newest;
		$scope.coolest = false;
	}

	$scope.changeCool = function() {
		$scope.coolest = !$scope.coolest;
		$scope.newest = false;
	}
})