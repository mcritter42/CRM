angular.module('customer').controller('Customer Controller', ['$scope', '$routeParams', '$location', 'Authentication', 'Customer', function($scope, $routeParams, $location, Authentication, Customer) {
    $scope.authentication = Authentication;
    
    $scope.create =function() {
        var customer = new Customer({
            firstName : this.firstName,
            lastName : this.lastName,
            email : this.email      
        });
        
        customer.$save(function(response) {
            $location.path('customer/' + response._id );
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };
    
    $scope.find = function() {
        $scope.customer = Customer.query();
    };
    
    $scope.findOne = function() {
        $scope.customer = Customer.get({
            customerId : $routeParams.customerId
        });
    };
    
    $scope.update = function() {
        $scope.customer.$update(function() {
            $location.path('customer/' + $scope.customer._id);
        }, function(errorResponse) {
            $scope.error = errorResponse.data..message;
        });
    };
    $scope.delete = function(customer) {
        if (customer) {
            customer.$remove(function() {
                for (var i in $scope.customer) {
                    if ($scope.customer[0] === customer) {
                        $scope.customer.splice(i, 1);
                    }
                }
            });
        } else {
            $scope.customer.$remove(function() {
                $location.path('cusotmer');
            });
        }
    };
}]);