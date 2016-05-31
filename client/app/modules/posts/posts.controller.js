angular.module('app')
.controller('postsController', postsController)

function postsController(posts, Posts) {
    var vm = this;
    
    vm.removePost = removePost;
    vm.posts = posts.data;
    vm.createPost = createPost;
    
    function removePost(post, index) {
        Posts.remove(post._id)
        .success(function() {
            vm.posts.splice(index, 1);
        })
    }
    
    function createPost() {
        Posts.create(vm.newPost)
        .success(function(post) {
            vm.posts.push(post);
            vm.newPost = {};
        })
    }
}
