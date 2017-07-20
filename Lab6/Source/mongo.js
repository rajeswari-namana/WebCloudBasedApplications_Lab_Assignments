var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();

var url = 'mongodb://Raji:abc123@ds057386.mlab.com:57386/aplwbdemo';
var ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//checking connection and inserting data
app.post('/create', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function () {
            res.write("Successfully inserted");
            res.end();
        });
    });
});

//getting data
app.get('/get', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        db.collection('students').find().toArray(function (err, result) {
            if (err) {
                res.write("get Failed");
                res.end();
            } else {

                res.send(JSON.stringify(result));
            }
        });
    });
});

// dalating data
app.get('/delete/:toBeDeleted_id', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var id = req.params.toBeDeleted_id;
        db.collection("students").deleteOne({"_id": new ObjectID(id)},function (err, obj) {
            if (err) throw err;
            console.log("deleted a student in the students list.");
            db.close();
        });
    });
});

// updating data
app.get('/update', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var find={};
        var newData={};

        if(req.params.s_id){
            find._id = new ObjectID(req.params.s_id);
        }
        if(req.query.SFirstName){
            newData.SFirstName = req.query.SFirstName;
        }
        if(req.query.SLastName){
            newData.SLastName = req.query.SLastName;
        }
        if(req.query.Grade){
            newData.Grade = req.query.Grade;
        }

        if(req.query.Email){
            newData.Email = req.query.Email;
        }

        db.collection('students').updateOne(find,{'$set':newData},
            function(err,result){
                if(err)
                    throw err;
                else
                    res.send("Update success !");
            });
    });
});

var insertDocument = function (db, data, callback) {
    db.collection('students').insertOne(data, function (err, result) {
        if (err) {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a student into the student list.");
        callback();
    });
};

//listening to server
var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});

