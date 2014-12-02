// server.js

// BASE SETUP
// =============================================================================
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Database');
// connect to our database

var Produs        = require('./models/produs');

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/produse')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var produs = new Produs(); 		// create a new instance of the Bear model
        produs.name = req.body.name;  // set the bears name (comes from the request)
        produs.quantity=req.body.quantity;
        produs.check=0;
        produs.edit=true;

        // save the bear and check for errors
        produs.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Produs created!' });
        })




    })
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Produs.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------


router.route('/produse/:produse_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {

        Produs.findById(req.params.produse_id, function(err, produs) {
            if (err)
                res.send(err);
            res.json(produs);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Produs.findById(req.params.produse_id, function(err, produs) {

            if (err)
                res.send(err);

            produs.name = req.body.name; 	// update the bears info
            produs.quantity=req.body.quantity;
            // save the bear
            produs.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Produs updated!' });
            });


        });
    })

    .delete(function(req, res) {
        Produs.remove({
            _id: req.params.produse_id
        }, function(err, produs) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);