const creatforum = require('./functions/createforum');
const updateforum = require('./functions/updateforum');
const deleteforum = require('./functions/deleteforum');
const getforum = require('./functions/getforum');
const getallforum = require('./functions/getAllforums');
const createComment = require('./functions/createcomment');

module.exports = {
    creatforum,
    updateforum,
    deleteforum,
    getforum,
    getallforum,
    createComment
}