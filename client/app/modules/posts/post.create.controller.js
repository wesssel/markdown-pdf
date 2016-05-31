angular.module('app')
.controller('createPostController', createPostController)

function createPostController(Posts, $location) {
    var vm = this;
    
    vm.submitPost = submitPost;
    
    function submitPost() {
        Posts.create(vm.post)
        .success(function(post) {
            $location.path('/posts');
        })
    }
}
