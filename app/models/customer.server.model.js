var mongoose = require('mongoose'),
    Schema =  mongoose.Schema;

var CustomerSchema = new Schema({
    created : {
        type: Date,
        default : Date.now
    },
    firstName : String,
    lastName : String,
    email : {
        type : String,
        index : true,
        match : [/.+\@.+\..+/, "Please fill a valid email address"]
    }
});


CustomerSchema.virtual('fullName').get(function() {
    return this.firstName + '' + this.lastName;
}).set(function(fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

mongoose.model('Customer', CustomerSchema);