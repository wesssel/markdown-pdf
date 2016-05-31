var mongoose = require('mongoose');

var PostScheme = new mongoose.Schema({
    title: String,
    text: String
});

mongoose.model('Post', PostScheme);
