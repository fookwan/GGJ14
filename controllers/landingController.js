var url = require('url');
var mongoose = require('mongoose');

exports.index = function(req, res) {
	res.render('index', {
		title : 'Landing'
	});
};

function resJSON(res, req, json) {
	res.writeHead(200, {
		'Content-Type' : 'application/json'
	});
	res.write(JSON.stringify(json));
	res.end();
}
