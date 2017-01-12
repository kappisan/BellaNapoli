var app = angular.module('bellaNapoliApp', ['ngRoute'])
    .config( ['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', { templateUrl: 'templates/home.html', controller: "homeCtrl" })  
            .when('/menu', { templateUrl: 'templates/menu.html', controller: "menuCtrl" })
            .when('/orders', { templateUrl: 'templates/orders.html', controller: "ordersCtrl" })
            .otherwise({ redirectTo: '/' });
    }]);


app.controller('homeCtrl', function($scope, $rootScope, $http) {
    console.log("home controller")

    $scope.selectPizza = function(pizza) {
        console.log("selectPizza", pizza);


        var data = JSON.stringify({
                user: "bob",
                pizza: pizza
            });
        $http.post("/api/makeOrder", data).success(function(data, status) {

            console.log("made order", data);
        })

    }
});

app.controller('ordersCtrl', function($scope, $rootScope, $http) {
    
    console.log("orders controller")

    $http({
        method: 'GET',
        url: '/api/getOrders'
    }).then(function successCallback(response) {
    
        console.log("got order", response);
                    
    }, function errorCallback(response) { console.log("error", response); });

});


app.controller('menuCtrl', function($scope, $rootScope) {
    console.log("menu controller")
});

app.controller('mainCtrl', function($scope, $rootScope) {
    console.log("menu controller")
});
