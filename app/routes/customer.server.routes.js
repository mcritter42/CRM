var users = require('../../app/controllers/users.server.controller'),
    customer = require('../../app/controllers/customer.server.controller');

module.exports = function(app) {
    app.route('/api/customer')
        .get(customer.list)
        .post(users.requiresLogin, customer.create);
    
    app.route('/api/customer/:customerId')
        .get(customer.read)
        .put(users.requiresLogin, customer.hasAuthorization, customer.update)
        .delete(users.requiresLogin, customer.hasAuthorization, customer.delete);
    
    app.param('customerId', customer.customerByID);
};