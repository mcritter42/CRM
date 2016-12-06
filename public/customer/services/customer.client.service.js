angular.module('customer').factory('Customer', ['$resource', function($resource) {
    return $resource('api/customer/:customerId', {
        customerId : '@_id'
    }, {
        update : {
            method : 'PUT'
        }
    });
}]);