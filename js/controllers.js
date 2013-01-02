'use strict';

google.load("feeds", "1");

/* Controllers */

function Search($scope, $location) {

    $scope.keyword = "";

    $scope.fetch = function(){
        google.feeds.findFeeds($scope.keyword, function(result){
            if (!result.error) {
                $location.path("/result");
                console.log(result);
            }
        });
    };

}

function MyCtrl1($scope) {

    $scope.data = "waiting!";
    $scope.status = "";
    $scope.query = "";

    $scope.fetch = function(){
        google.feeds.findFeeds($scope.query, function(result){
            if (!result.error) {
                console.log(result);
            }
        });
    };

}


function MyCtrl2() {
}
MyCtrl2.$inject = [];