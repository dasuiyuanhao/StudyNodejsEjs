var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page.' });
});
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page.' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: '用户登录' });
});

module.exports = router;
