exports.render = function(req, res){
    
    res.render('index', {
        title: 'hello world',
        user : JSON.stringify(req.user)
    });
};