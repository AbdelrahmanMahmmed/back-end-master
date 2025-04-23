const mongoose = require('mongoose');

const dailyMessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    sentAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('DailyMessage', dailyMessageSchema);
