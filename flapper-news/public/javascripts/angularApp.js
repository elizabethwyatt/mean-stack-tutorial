var app = angular.module('flapperNews', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl'
            })
        ;

        $urlRouterProvider.otherwise('home');
    }
]);

app.controller('MainCtrl', [
    '$scope',
    'posts',
    function($scope, posts){
        $scope.posts = posts.posts;

        $scope.addPost = function(){
            if(!$scope.postTitle || $scope.postTitle === '') { return; }
            $scope.posts.push({
                title: $scope.postTitle, 
                link: $scope.postLink,
                upvotes: 0,
                comments: [
                    {author: 'Joe', body: 'Cool post!', upvotes: 0},
                    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                ]
            });
            $scope.postTitle = '';
            $scope.postLink = '';
        };

        $scope.incrementUpvotes = function(post){
            post.upvotes += 1;
        };
    }
]);

app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function($scope, $stateParams, posts){
        $scope.post = posts.posts[$stateParams.id];

        $scope.addComment = function(){
            if($scope.commentBody === '') { return; }
            $scope.post.comments.push({
                body: $scope.commentBody,
                author: 'user',
                upvotes: 0
            });
            $scope.commentBody = '';
        };

        $scope.incrementUpvotes = function(comment){
            comment.upvotes += 1;
        };
    }
]);

app.factory('posts', [function(){
    var o = {
        posts: [
            { title: 'post 1', upvotes: 5,
                comments: [
                    {author: 'Joe', body: 'Cool post!', upvotes: 0},
                    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                ]
            },
            { title: 'post 2', upvotes: 2,
                comments: [
                    {author: 'Joe', body: 'Cool post!', upvotes: 0},
                    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                ]
            },
            { title: 'post 3', upvotes: 15,
                comments: [
                    {author: 'Joe', body: 'Cool post!', upvotes: 0},
                    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                ]
            },
            { title: 'post 4', upvotes: 9,
                comments: [
                    {author: 'Joe', body: 'Cool post!', upvotes: 0},
                    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                ]
            },
            { title: 'post 5', upvotes: 4,
                comments: [
                    {author: 'Joe', body: 'Cool post!', upvotes: 0},
                    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                ]
            }
        ]
    };
    return o;
}]);