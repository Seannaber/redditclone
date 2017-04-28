var app = angular.module('flapperNews', ['ui.router']);


app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl'
			});
		$stateProvider
			.state('posts', {
			  url: '/posts/{id}',
			  templateUrl: '/posts.html',
			  controller: 'PostsCtrl'
			});
		$urlRouterProvider.otherwise('home');
	}]);
app.factory('posts', [function(){
	var o = {
		posts: [
		{title: 'I rarely get lucky with nice sunsets while visiting cool locations, but this was one of the times. Hvítserkur, Northern Iceland [OC][5433x3622]', upvotes: 5, comments: []},
		{title: 'Astrophysicists study ‘rejuvenating’ pulsar in a neighboring galaxy', upvotes: 2, comments: []},
		{title: 'Marshawn Lynch agrees to Raiders deal; teams to trade terms on late round 2018 picks', upvotes: 15, comments: []},
		{title: 'Just turned 18, What is the best way to start building credit', upvotes: 9, comments: []},
		{title: 'Speedboat hits rocks and loses control', upvotes: 4, comments: []}
	]
	};
	return o;
}]);
app.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){

	$scope.posts = posts.posts;

	$scope.addPost = function () {
		if (!$scope.title || $scope.title === "") { return; }
		$scope.posts.push({
		  title: $scope.title,
		  link: $scope.link,
		  upvotes: 0,
		  comments: [
		    {author: 'Joe', body: 'Cool post!', upvotes: 0},
		    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
		  ]
		});
		$scope.title = "";
		$scope.link = "";
	};

	$scope.incrementUpvotes = function (post) {
		post.upvotes += 1;
	}; 

}]);
app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts) {
	$scope.post = posts.posts[$stateParams.id];
	console.log(posts.posts, $scope.post);
	$scope.addComment = function () {
		if($scope.body === '') {return;}
		console.log($scope);
		$scope.post.comments.push({
			body: $scope.body,
			author: 'user',
			upvotes: 0
		});
		$scope.body = '';
	};
}]);