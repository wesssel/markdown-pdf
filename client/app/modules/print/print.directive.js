angular.module('app')
.directive('printPost', printPost)

function printPost(Print) {
    return {
        scope: {
            content: '=content'
        },
        template: '<button ng-click="print()">Print</button>',
        controller: function($scope, $element){
            $scope.print = print;
            
            function print(){
                Print.print($scope.content)
            }
        }
    };
};
