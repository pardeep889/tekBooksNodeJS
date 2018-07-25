'use strict';
var mongoose = require('mongoose');

var db = function(){
    return{
        config: function(conf){
            mongoose.connect('mongodb://localhost:27017/tekBooks');
            var db = mongoose.Connection;

            // console.log(db.STATES);

            // db.on('error', console.error.bind(console, 'connection error'));
            // db.once('open', function(){
            //     console.log('Connection Opened : ');
            // });
        }
    };
};

// var mongo = require("mongoose");
// // mongodb://<dbuser>:<dbpassword>@ds001.mlab.com:001/db101
// var db =
//     mongo.connect("mongodb://127.0.0.1:27017/tekBooks", function(err, response){
//         if(err){ console.log('Failed to connect to ' + db); }
//         else{ console.log('Connected to Database' + db, ' + ', response); }
//     });





module.exports=db();
