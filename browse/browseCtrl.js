var app = angular.module('doApp'); 

app.controller('browseCtrl', function($scope, qbb, services, completedRef, $firebaseArray, $firebaseAuth) {

	//get the info

	$scope.completedList = $firebaseArray(completedRef)

	console.log($scope.completedList)

	$scope.completedList.$loaded()
	.then(function(data) {
		console.log(data);
		// for (var key in data) {
		// 	if (data[key].posted) {
		// 		data[key].posted = new Date(data[key].posted);
		// 	}
		// }
	})

	//likes function

	$scope.upvote = function(item){
		// if(typeof item.posted === "object"){
		// 	item.posted = item.posted.toISOString();
		// }
		item.score++;
		$scope.completedList.$save(item);
		// item.posted = new Date(item.posted);
		console.log(item.posted)
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