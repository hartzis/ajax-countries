var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

var allCountries = require('./models/countries.json')

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/countries', function(req, res) {
    // console.log(allCountries);
    res.send(allCountries);
})

app.post('/traveled', function(req, res) {
    // console.log(req.body);
    var traveledCountry = req.body['traveledCountry'];
    // console.log(traveledCountry);

    _.forEach(allCountries, function(country) {
        if (country.name === traveledCountry) {
            country.traveled = country.traveled ? false : true;
        }
    });

    // console.log(_.filter(allCountries, function(country) {
    //     return country.name === traveledCountry
    // }));

    res.send('traveling!');
})

app.get('/search', function(req, res) {

    // console.log('searching for:', req.query);
    var searchQuery = req.query['searchQuery']
    console.log("the search query:", searchQuery);

    // perform the search
    var foundCountries = _.filter(allCountries, function(country) {
        return _.contains(country.name.toLowerCase(), searchQuery.toLowerCase());
    });

    // console.log(foundCountries);

    res.send(foundCountries);
})

var server = app.listen(6627, function() {
    console.log('Express server listening on port ' + server.address().port);
});