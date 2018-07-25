'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {
    router.get('/', function (req, res) {
        res.render('index');
    });
    router.get('/details/:id', function (req, res) {
        var id =  req.params.id;
        // console.log(id);
        Book.findOne({_id: id}, function(err,book){
            if(err) throw err;
            var model = {
                book: book
            };
            res.render('books/details', model);
        });

    });
};
