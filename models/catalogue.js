var mongoose = require('mongoose');

var catalogueSchema = new mongoose.Schema({
    title: String,
    description: String,
    weight: Number,
    price: Number,
    stock: Number,
    img: String,
});
  
const CatalogueModel = mongoose.model("articles", catalogueSchema);
  
module.exports = CatalogueModel;