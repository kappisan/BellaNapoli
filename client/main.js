var app = angular.module('bellaNapoliApp', ['ngRoute'])
    .config( ['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', { templateUrl: 'templates/home.html', controller: "homeCtrl" })  
            .when('/menu', { templateUrl: 'templates/menu.html', controller: "menuCtrl" })
            .when('/order', { templateUrl: 'templates/order.html', controller: "orderCtrl" })
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

app.controller('orderCtrl', function($scope, $rootScope, $http) {
    
    console.log("order controller")

    $scope.submitOrder = function() {

        console.log("submitting order for", $scope.fullName);

        var data = JSON.stringify({
                user: $scope.fullName,
                pizza: "pizza",
                order: $rootScope.order
            });
        $http.post("/api/makeOrder", data).success(function(data, status) {

            console.log("made order", data);
        })
    }

});


app.controller('menuCtrl', function($scope, $rootScope, $http) {
    console.log("menu controller");

    $scope.menu = {};

    $http({
        method: 'GET',
        url: '/api/getMenu'
    }).then(function successCallback(response) {
    
        console.log("got order", response);

        $scope.menu = response.data;
                    
    }, function errorCallback(response) { console.log("error", response); });

    $scope.addToOrder = function(item) {
        console.log("add item to order", item);
        $rootScope.order.push(item);
        $rootScope.totalItems = $rootScope.order.length;

        var priceTotal = 0;

        $rootScope.order.forEach(function(itm) {
            priceTotal += itm.price;
        })


        $rootScope.totalPrice = priceTotal;
    } 

});

app.controller('mainCtrl', function($scope, $rootScope) {
    console.log("menu controller");

    $rootScope.totalItems = 0;
    $rootScope.totalPrice = 0;
    $rootScope.order = [];

});
