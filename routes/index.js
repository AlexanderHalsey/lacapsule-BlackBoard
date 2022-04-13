var CatalogueModel = require('../models/catalogue');
var CommandeModel = require('../models/commande');
var UserModel = require('../models/users');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', async function(req, res, next) {
  var out_of_stock = await CatalogueModel.find({ stock: 0 });
  out_of_stock = out_of_stock.length;
  var admin = await UserModel.findById('5c52e4efaa4beef85aad5e52')
  var unread_messages = admin.messages.filter(obj => obj.read === false).length;
  var open_tasks = admin.tasks.filter(obj => obj.dateCloture === null ).length;
  res.render('index', { out_of_stock, unread_messages, open_tasks });
});

/* GET tasks page. */
router.get('/tasks-page', async function(req, res, next) {
  var admin = await UserModel.findById('5c52e4efaa4beef85aad5e52');
  res.render('tasks', { tasks: admin.tasks });
});

/* GET Messages page. */
router.get('/messages-page', async function(req, res, next) {
  var admin = await UserModel.findById('5c52e4efaa4beef85aad5e52');
  res.render('messages', { messages: admin.messages });
});

/* GET Users page. */
router.get('/users-page', async function(req, res, next) {
  var users = await UserModel.find({ status: "customer" });
  console.log(users);
  res.render('users', { users });
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
router.get('/charts', async function(req, res, next) {

  // group users by gender and count
  var gender_aggregate = UserModel.aggregate();
  gender_aggregate.group({ _id: "$gender", sexCount: { $sum: 1 } });
  var gender = await gender_aggregate.exec();
  gender = JSON.stringify(gender);

  // find admin and count read and unread messages
  var admin = await UserModel.findById('5c52e4efaa4beef85aad5e52');
  var messages = {read: 0, unread: 0};
  for (let message of admin.messages) {
    if (message.read) messages.read += 1;
    else messages.unread += 1;
  }
  messages = JSON.stringify(messages);

  // find payed orders and group by "sent" "not sent"
  var payed_aggregate = CommandeModel.aggregate([
    { $match: { status_payment: "validated" }},
    { $group: { _id: "$status_shipment", status_shipment: { $sum: 1 } } }
  ]);
  var payed = await payed_aggregate.exec();
  payed = JSON.stringify(payed);

  // find payed orders and split them by month
  var mt_aggregate = CommandeModel.aggregate([
    { $match: { status_payment: "validated" }},
    { $group: { _id: { month: { $month: "$date_payment" } }, monthlyTurnover: { $sum: "$total" } }}
  ]);
  var monthly_turnover = await mt_aggregate.exec();
  monthly_turnover = JSON.stringify(monthly_turnover);

  res.render('charts', { gender, messages, payed, monthly_turnover });
});

module.exports = router;
