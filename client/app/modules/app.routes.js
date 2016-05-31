angular.module('app')
.config(routes)

function routes($stateProvider, $urlRouterProvider, $locationProvider) {	
	$stateProvider
	.state('posts', {
		url: '/posts',
		templateUrl: '/app/modules/posts/posts.html',
		controller: 'postsController as vm',
		resolve: {
			posts: function(Posts) {
				return Posts.getAll();
			}
		}
	})
	.state('create', {
		url: '/create',
		templateUrl: '/app/modules/posts/post.editor.html',
		controller: 'createPostController as vm'
	})
	.state('edit', {
		url: '/post/{id}',
		templateUrl: '/app/modules/posts/post.editor.html',
		controller: 'editPostController as vm',
		resolve: {
			post: function(Posts, $stateParams) {
				return Posts.get($stateParams.id);
			}
		}
	})
    
	$urlRouterProvider.otherwise('/create');
};
