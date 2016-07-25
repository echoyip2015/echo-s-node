'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _memoryCache = require('memory-cache');

var _memoryCache2 = _interopRequireDefault(_memoryCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	var CACHE_TIME = 24 * 60 * 60 * 1000;
	if (_memoryCache2.default.get('index_movie_list') == null) {
		var options = {
			uri: 'https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php',
			headers: {
				'Host': 'sp0.baidu.com',
				'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36'
			},
			qs: {
				'resource_id': '6862',
				'from_mid': '1',
				'format': 'json',
				'ie': 'utf-8',
				'oe': 'utf-8',
				'query': '电影',
				'sort_key': 16,
				'sort_type': 1,
				'stat0': '',
				'stat1': '',
				'stat2': '',
				'stat3': '',
				'pn': 0,
				'rn': 48
			},
			json: true
		};
		(0, _requestPromise2.default)(options).then(function (data) {
			data.isindex = true;

			// 缓存
			_memoryCache2.default.put('index_movie_list', JSON.stringify(data), CACHE_TIME);

			res.render('index', { data: data });
		}).catch(function (err) {
			console.log(err);
		});
	} else {
		// 读取缓存
		var data = JSON.parse(_memoryCache2.default.get('index_movie_list'));

		res.render('index', { data: data });
	}
});

module.exports = router;
//# sourceMappingURL=index.js.map
