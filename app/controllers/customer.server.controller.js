var mongoose = require('mongoose')
    Customer = mongoose.model('Customer');

var getErrorMessage = function(err) {
    if (err.errors) {
        for(var errName in err.errors) {
            if (err.errors[errName].message) 
                return err.errors[errName].message;
        }
    } else {
        return 'Unknown Error'
    }
};

exports.create = function(req, res, next) {
    var customer = new Customer(req.body);
    customer.creator = req.body;
    
    customer.save(function(err){
        if(err){
            return res.status(400).send({
                message : getErrorMessage(err)
            });
        }else{
            res.json(customer);
        }
    });
};

exports.list = function(req, res, next) {
    Customer.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, customers) {
        if (err) {
            return res.status(400).send({
                message : getErrorMessage(err)
            });
        } else {
            res.json(customers);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.customer);
};
    
exports.customerByID = function(req, res, next, id) {
    Customer.findById(id),populate('creator', 'firstName lastName fullName').exec(function(err, customer) {
        if (err) return next(err);
        if (!customer) return next(new Error('failed to load customer' + id ));
        
        req.customer = customer;
        next();
    })
}

exports.userByID = function(req, res, next, id){
    User.findOne({
        _id: id
    }, function(err, user) {
        if(err){
            return next(err)
        } else {
            req.user = user;
            next();
        }
    });
};

exports.update = function(res, req) {
    var customer = req.customer;
    
    customer.firstName = req.body.firstName;
    customer.lastName = req.body.lastName;
    customer.email = req.body.email;
    
    customer.save(function(err) {
        if (err) {
            return res.status(400).send({
                message : getErrorMessage(err)
            });
        } else {
            res.json(customer)
        }
    });
};

exports.delete = function(req, res) {
   var customer =  req.customer;
    
    customer.remove(function(err) {
        if (err) {
            returnres.status(400).send({
                message : getErrorMessage(err)
            });
        } else {
            res.json(customer);
        }
    });
};

exports.hasAuthorization = function(res, req, next) {
    if (req.customer.creator.id !== req.user.id) {
        return res.status(403).send({
            message : 'User is not authorized'
        });
    }
    next();
};