var CatalogueModel = require('../models/catalogue');
var CommandeModel = require('../models/commande');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET tasks page. */
router.get('/tasks-page', function(req, res, next) {
  res.render('tasks');
});

/* GET Messages page. */
router.get('/messages-page', function(req, res, next) {
  res.render('messages');
});

/* GET Users page. */
router.get('/users-page', function(req, res, next) {
  res.render('users');
});

/* GET Catalog page. */
router.get('/catalog-page', async function(req, res, next) {
  var catalogue = await CatalogueModel.find();
  res.render('catalog', { catalogue });
});

/* GET Orders-list page. */
router.get('/orders-list-page', async function(req, res, next) {
  var commandes = await CommandeModel.find();
  res.render('orders-list', { commandes });
});

/* GET Order detail page. */
router.get('/order-page', async function(req, res, next) {
  var commande = await CommandeModel.findById(req.query.i).populate('articles');
  res.render('order', { commande });
});

/* GET chart page. */
router.get('/charts', function(req, res, next) {
  res.render('charts');
});



module.exports = router;
