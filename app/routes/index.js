'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

// Do I really have to do this?
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
'August', 'September', 'October', 'November', 'December'];

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/api/:id')
		.get(function (req, res) {
			var date = req.params.id;
			var data = {'unix': null, 'natural': null};
			
			var adate = new Date(Date.parse(date));
			if (!isNaN(adate)) {
				data.natural = date;
				data.unix = adate.getTime();
			} else {
				date = parseInt(date);
				if (!isNaN(date)) {
					adate = new Date(date);
					data.unix = date;
					data.natural = months[adate.getMonth()] + ' ' +
					adate.getDate() + ', ' + adate.getFullYear();
				}
			}
			
			res.json(data);
		});
};
