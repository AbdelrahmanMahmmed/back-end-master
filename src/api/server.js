// External Modules
const express = require('express');
const dotenv = require('dotenv');
const ApiError = require('../util/APIError');
const globalError = require('../middleware/errormiddleware');
const http = require('http');

// Load environment variables
dotenv.config();

// Internal Modules
const dbConnect = require('../config/dbConnection');

const authRoutes = require("../modules/auth/router/auth.route");
const userRoutes = require("../modules/user/router/user.route");
const contactRoutes = require("../modules/contactUs/router/contact.route");
const articleRoutes = require("../modules/articles/router/article.route"); 
const forumRoutes = require("../modules/Forum/router/forum.route");
const notificationRoutes = require("../modules/notification/router/notification.route");

// App Initialization
const app = express();

// Connect to MongoDB
dbConnect();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello Sama!');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/article', articleRoutes);
app.use('/api/v1/forum', forumRoutes);
app.use('/api/v1/notification', notificationRoutes);


/**
 * * @description - This function is used to send a daily message to the users.
 */
const sendDailyMessage = require('../modules/notification/controller/functions/createDailyMessage');
sendDailyMessage();

// Error handling middleware
app.use((req, res, next) => {
    next(new ApiError(`No route found for: ${req.originalUrl}`, 404));
});
app.use(globalError);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.error(`unhandledRejection ${err.name} | ${err.message}`);
    server.close(() => process.exit(1));
});

module.exports = app;
