var mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
    meta_data:{}

},
{ timestamps: true }
);

mongoose.model("file",fileSchema);