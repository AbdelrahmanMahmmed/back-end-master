const express = require('express');
const router = express.Router();

const {
    CreateArticleValidator,
    updatedArticleValidator
} = require('../validator/article.vaildator');

const { middlewareFunctions } = require('../../auth/controller/auth.controller');


const articleContrller = require('../controller/article.controller');

router.post('/create',
    middlewareFunctions.ProtectedRoters,
    middlewareFunctions.allwedTo('doctor'),
    CreateArticleValidator,
    articleContrller.createArticle
);

router.get('/',
    middlewareFunctions.ProtectedRoters,
    articleContrller.getArticles
);

router.put('/:id',
    middlewareFunctions.ProtectedRoters,
    middlewareFunctions.allwedTo('doctor'),
    updatedArticleValidator,
    articleContrller.updateArticle
);

router.delete('/:id',
    middlewareFunctions.ProtectedRoters,
    middlewareFunctions.allwedTo('doctor'),
    articleContrller.deleteArticle
);

router.get('/:id',
    middlewareFunctions.ProtectedRoters,
    articleContrller.getArticleById
);

module.exports = router;