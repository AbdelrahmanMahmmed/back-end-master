const express = require('express');
const router = express.Router();

const {
    CreateArticleValidator,
} = require('../validator/article.vaildator');

const { middlewareFunctions } = require('../../auth/controller/auth.controller');


const articleContrller = require('../controller/article.controller');

router.post('/create',
    middlewareFunctions.ProtectedRoters,
    middlewareFunctions.allwedTo('doctor'),
    CreateArticleValidator,
    articleContrller.createArticle
);

module.exports = router;