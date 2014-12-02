// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProdusSchema   = new Schema({
    name: String,
    quantity: Number,
    check: Number,
    edit: Boolean

});

module.exports = mongoose.model('Produses', ProdusSchema);