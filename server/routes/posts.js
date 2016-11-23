var express = require('express');
var router = express.Router();
const postController = require('../controllers/controllers.api.posts')

router.get('/', postController.getPosts)
router.post('/', postController.addPost)
router.delete('/', postController.deletePostByPostId)
router.delete('/comment', postController.deleteComment)
router.put('/post', postController.updatePost)
router.put('/comment', postController.addComment)

module.exports = router;