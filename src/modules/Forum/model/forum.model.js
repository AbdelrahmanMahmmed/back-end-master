const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
    context: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        comment : {
            type: String,
            required: true,
            trim: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],

},{timestamps: true })

const Forum = mongoose.model('Forum', forumSchema, 'Forum')

module.exports = Forum