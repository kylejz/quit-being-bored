var app = angular.module('doApp');

app.service('services', function(qbb, $firebaseAuth) {
	
	this.getIdeas = function() {
		return new Firebase(qbb.url + 'ideas');
	}

	this.getAuthObj = function() {
		var ref = new Firebase(qbb.url);
		return $firebaseAuth(ref);
	}

	this.getList = function(uid) {
		return new Firebase(qbb.url + '/users/' + uid + '/ideaList')
	}

	this.getUser = function(uid) {
		return new Firebase(qbb.url + '/users/' + uid)
	}

	this.getCompleted = function() {
		return new Firebase(qbb.url + '/completed/')
	}
})