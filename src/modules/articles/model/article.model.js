const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title : {
        type: String,
        required: true,
        trim: true,
    },
    description : {
        type: String,
        required: true,
        trim: true,
    },
},{timestamps: true,});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;