const cron = require('node-cron');
const DailyMessage = require('../../model/notification.model');

const messages = require('../massages');

const sendDailyMessage = () => {
    cron.schedule('0 9 * * *', async () => { // */5 * * * * * for Sending every 5 Sec
        try {
            const randomIndex = Math.floor(Math.random() * messages.length);
            const selectedMessage = messages[randomIndex];

            const newMessage = new DailyMessage({
                message: selectedMessage,
            });

            await newMessage.save();

            console.log('Daily message sent:', selectedMessage);
        } catch (err) {
            console.error('Error sending daily message:', err.message);
        }
    });
};

module.exports = sendDailyMessage;
