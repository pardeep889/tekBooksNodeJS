'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');
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
    router.delete('/books/delete/:id', function(req,res){
        Book.remove({_id: req.params.id}, function(err){
            if(err) throw err;
            req.flash('success', 'Book is Deleted');
            res.location('/');
            res.redirect('/');
        });
    });
    router.get('/category/add/', function(req,res){
        res.render('manage/categories/add');
    });

    router.post('/categories', function(req,res){
        var name = req.body.name && req.body.name.trim();

        if(name == ''){
            req.flash('error', 'please fill out the the name');
            res.location('/manage/categories/add');
            res.redirect('/manage/categories/add');
        }
        var newCategory = new Category({
            name: name
        });

        newCategory.save(function(err){
            if(err) throw err;
            req.flash('Success', 'Category Added Successfully');
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });
    });

    router.get('/categories/edit/:id', function(req,res){
        Category.findOne({_id: req.params.id}, function(err,category){
            if(err) throw err;
            var model = {
                category: category
            };
            res.render('manage/categories/edit', model);
        });
    });

    router.post('/categories/edit/:id', function(req,res){
        var name = req.body.name && req.body.name.trim();
        Category.update({_id: req.params.id} ,{ name: name }, function(err){
            if(err) throw err;
            req.flash('Success', 'Category Updated');
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });
    });

    router.delete('/categories/delete/:id', function(req,res){
        Category.remove({_id: req.params.id}, function(err){
            if(err) throw err;
            req.flash('success', 'Category is Deleted');
            res.location('/');
            res.redirect('/');
        });
    });
};
