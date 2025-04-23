const express = require('express');
const router = express.Router();

const {
    CreateForumValidator
} = require('../validator/forum.validator');

const { middlewareFunctions } = require('../../auth/controller/auth.controller');


const forumController = require('../controller/forum.controller');

router.post('/create', 
    middlewareFunctions.ProtectedRoters,
    CreateForumValidator,
    forumController.creatforum
);

router.put('/:id/update', 
    middlewareFunctions.ProtectedRoters,
    // CreateForumValidator,
    forumController.updateforum
);

router.delete('/:id/delete', 
    middlewareFunctions.ProtectedRoters,
    // CreateForumValidator,
    forumController.deleteforum
);

router.get('/:id', 
    middlewareFunctions.ProtectedRoters,
    // CreateForumValidator,
    forumController.getforum
);

router.get('/', 
    middlewareFunctions.ProtectedRoters,
    // CreateForumValidator,
    forumController.getallforum
);


router.post('/:id/comment', 
    middlewareFunctions.ProtectedRoters,
    // CreateForumValidator,
    forumController.createComment
);


module.exports = router;