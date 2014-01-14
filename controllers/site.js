var mongodb = require('../models/db');
/**
 * 首页
 */
exports.index = function (req, res) {
	var _index = {
		title: '即时聊天 - 首页 sessions',
		user: req.session.user,
		users: [],
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	};
	
	mongodb.open(function (err, db) {
		if(err) res.render('index', _index);
		
		db.collection('sessions', function (err, collection) {
			if(err) {
				mongodb.close();
				res.render('index', _index);
			}
			collection.find().toArray(function (err, items) {
				mongodb.close();
				for(var i=0, j=items.length; i<j; i++) {
					var user = JSON.parse(items[i].session).user;
					if(user) {
						user.sessionid = items[i]._id;
						_index.users.push(user);
					}
				}
				console.log(_index.users);
				res.render('index', _index);
			});
		});
	});
};

/**
 * 关于页面
 */
exports.about = function (req, res) {
	
};