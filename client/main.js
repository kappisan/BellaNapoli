var app = angular.module('bellaNapoliApp', ['ngRoute'])
    .config( ['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', { templateUrl: 'templates/home.html', controller: "homeCtrl" })  
            .when('/menu', { templateUrl: 'templates/menu.html', controller: "menuCtrl" })
            .when('/order', { templateUrl: 'templates/order.html', controller: "orderCtrl" })
            .when('/braintree', { templateUrl: 'templates/braintree.html', controller: "braintreeCtrl" })
            .otherwise({ redirectTo: '/' });
    }]);

app.controller('braintreeCtrl', function($scope, $rootScope, $http) {
    console.log("braintreeCtrl");
});

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
    
    console.log("order controller");
    $rootScope.orderSuccess = false;
    $rootScope.showError = false;
    $rootScope.error = "";

    function checkIfComplete() {

        var incomplete = [];

        if(!$rootScope.orderDetails.fullName != "") {
            incomplete.push("fullName");
        }
        if(!$rootScope.orderDetails.address != "") {
            incomplete.push("address");
        }
        if(!$rootScope.orderDetails.postCode != "") {
            incomplete.push("postCode");
        }
        if(!$rootScope.orderDetails.phoneNumber != "") {
            incomplete.push("phoneNumber");
        }

        if(incomplete.length == 0) {
            return true;
        } else {
            $rootScope.showError = true;
            $rootScope.error = "form incomplete";
            console.log("incomplete", incomplete);
            return false;  
        } 
    }

    $scope.submitOrder = function() {

        if(!checkIfComplete()) {
            return console.log("not submitting order");
        }

        console.log("submitting order for", $scope.orderDetails);

        var data = JSON.stringify({
                user: $scope.orderDetails,
                pizza: "pizza",
                order: $rootScope.order
            });
        $http.post("/api/makeOrder", data).success(function(data, status) {

            $scope.orderSuccess = true;

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

    $rootScope.orderDetails = {
        fullName: "",
        address: "",
        postCode: "",
        phoneNumber: ""
    }

    $rootScope.displayPrice = function(price) {
        return '£' + numeral(price).format('0,0.00')
    }

});
