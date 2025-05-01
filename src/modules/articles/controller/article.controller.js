
const createArticle = require('./functions/createarticle');
const getArticles = require('./functions/getArticles');
const updateArticle = require('./functions/updateArticle');
const deleteArticle = require('./functions/deleteArticle');
const getArticleById = require('./functions/getArticleById');
module.exports = {
    createArticle,
    getArticles,
    updateArticle,
    deleteArticle,
    getArticleById
}