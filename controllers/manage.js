'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');
var flash = require('connect-flash');
module.exports = function (router) {
    router.get('/books', function (req, res) {
        Book.find({}, function(err,books){
            if(err) throw err;
            var model = {
                books: books
                // categories: categories
            };
            res.render('manage/books/index', model);
        });

    });
    router.get('/', function (req, res) {
        res.render('manage/index');
    });

    router.get('/books/add', function (req, res) {
        Category.find({}, function(err,categories){
            if(err) throw err;
            var model = {
                categories: categories
            };
            res.render('manage/books/add', model);
        });
    });


    router.get('/categories', function (req, res) {
        Category.find({}, function(err,categories){
            if(err) throw err;
            var model = {
                categories: categories
            };
            res.render('manage/categories/index', model);
        });
    });

    router.post('/books', function(req,res){
        var title = req.body.title && req.body.title.trim();
        var category = req.body.category && req.body.category.trim();
        var author = req.body.author && req.body.author.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        var price = req.body.price && req.body.price.trim();
        var description = req.body.description && req.body.description.trim();
        var cover = req.body.cover && req.body.cover.trim();

        if(title == '' || price == ''){
            req.flash('error', 'Please Fill out Required Fields');
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }
        if(isNaN(price)){
            req.flash('error', 'Price Must be a Number');
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }

        var newBook = new Book({
            title: title,
            category: category,
            description: description,
            author: author,
            publisher: publisher,
            cover: cover,
            price: price
        });

        newBook.save(function(err){
            if(err) throw err;
            req.flash('success', 'Book is Added');
            res.location('/manage/books');
            res.redirect('/manage/books');
        });

    });

    router.get('/books/edit/:id', function(req,res){
        Category.find({}, function(err,categories){
            Book.findOne({_id: req.params.id}, function(err, book){
                if(err) throw err;
                var model = {
                    categories: categories,
                    book: book
                };
                res.render('manage/books/edit', model);
            });
        });
    });


    router.post('/books/edit/:id', function(req,res){
        var title = req.body.title && req.body.title.trim();
        var category = req.body.category && req.body.category.trim();
        var author = req.body.author && req.body.author.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        var price = req.body.price && req.body.price.trim();
        var description = req.body.description && req.body.description.trim();
        var cover = req.body.cover && req.body.cover.trim();

        if(title == '' || price == ''){
            req.flash('error', 'Please Fill out Required Fields');
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }
        if(isNaN(price)){
            req.flash('error', 'Price Must be a Number');
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }

        Book.update({_id: req.params.id},{
            title: title,
            category: category,
            description: description,
            author: author,
            publisher: publisher,
            cover: cover,
            price: price
        },function(err){
            if(err) throw err;
            req.flash('success', 'Book is Updated');
            res.location('/manage/books');
            res.redirect('/manage/books');
        });
    });
};
