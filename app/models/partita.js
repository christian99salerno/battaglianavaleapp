var mongoose = require('mongoose');

var partitaSchema = new mongoose.Schema({
    id_user1: { type:String, required:true },
    id_user2: String,
    state: { type: String, required: true, default: "preparazione" }
});

module.exports = mongoose.model('Match', partitaSchema);
