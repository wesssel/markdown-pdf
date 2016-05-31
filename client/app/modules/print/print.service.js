angular.module('app')
.factory('Print', printService)

function printService($http) {
    var o = {
        print: print
    };
    
    return o;
    
    function print(content) {
        return $http.post('/api/print', content);
    };
}
