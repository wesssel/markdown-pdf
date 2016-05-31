angular.module('app')
.controller('editPostController', editPostController)

function editPostController(post, Posts, $location) {
    var vm = this;
    
    vm.post = post;
    vm.submitPost = submitPost;
    
    function submitPost() {
        Posts.update(vm.post)
        .success(function() {
            $location.path('/posts');
        })
    }
}
