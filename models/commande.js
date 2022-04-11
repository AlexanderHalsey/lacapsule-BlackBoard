var mongoose = require('mongoose');

var commandeSchema = new mongoose.Schema({
    articles: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'articles'},
    ],
    total: Number,
    shipping_cost: Number,
    date_insert: Date,
    status_payment: ["validated", "refused", "waiting"],
    date_payment: Date,
    status_shipment: Boolean,
    date_shipment: Date,
    delivery_address: String,
    delivery_city: String,
    delivery_zipcode: String,
});
  
const CommandeModel = mongoose.model("orders", commandeSchema);
  
module.exports = CommandeModel;