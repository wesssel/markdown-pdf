angular.module('app')
.factory('Posts', postsService)

function postsService($http) {
    var o = {
        create: create,
        get: get,
        getAll: getAll,
        remove: remove,
        update: update
    };
    
    return o;
      
    function create(post) {
        return $http.post('/api/posts/', post);
    };

	function get(post) {
		return $http.get('/api/posts/' + post)
        .then(function(res){
			return res.data;
		});
	};
    
	function getAll() {
		return $http.get('/api/posts')
	};

	function remove(post) {
	  	return $http.delete('/api/posts/' + post);
	};
    
    function update(post) {
	  	return $http.put('/api/posts/' + post._id, post);
    }
}
