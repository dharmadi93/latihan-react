const Post = require('../models/models.api.posts')

module.exports = {

    getPosts: function (req, res) {
        Post.find(function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    getPostByPostId: function (req, res) {
        Post.findOne({
            PostId: req.body.PostId
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    addPost: function (req, res) {
        const post = {
            createdBy: req.body.user,
            PostId: Date.now(),
            title: req.body.title,
            comments: []
        }

        Post.create(post, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    deletePostByPostId: function (req, res) {
        Post.findOneAndRemove({
            PostId: req.body.PostId
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    deleteAllPost: function (req, res) {
        Post.remove({}, function (err, data) {
            if (err) res.json(err)
            else res.json("All Post deleted")
        })
    },

    updatePost: function (req, res) {
        Post.findOneAndUpdate({
            PostId: req.params.PostId
        }, {
            title: req.body.title
        }, {
            new: true,
            upsert: false
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    addComment: function (req, res) {
        Post.findOneAndUpdate({
            PostId: req.body.PostId
        }, {
            $push: {
                comments: {
                    createdBy: req.body.username,
                    content: req.body.content
                }
            }
        }, {
            new: true,
            upsert: false
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    deleteAnswer: function (req, res) {
        Post.findOneAndUpdate({
            PostId: req.params.PostId
        }, {
            $pull: {
                answers: {
                    _id: req.params.id
                }
            }
        }, {
            new: true,
            upsert: false
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    viewAnswer: function (req, res) {
        console.log("q", req.params.PostId)
        console.log("a", req.params.id)
        Post.findOne({
            PostId: req.params.PostId
        }, function (err, data) {
            let answers = data.answers
            let datum
            for (let i in answers) {
                if (answers[i].id === req.params.id) {
                    datum = answers[i]
                }
            }
            console.log(datum)
            if (err) res.json(err)
            else res.json(datum)
        })
    },

    updateAnswer: function (req, res) {
        Post.findOneAndUpdate({
            // PostId: req.params.PostId,
            'answers._id': req.params.id
        }, {
            'answers.$.answer': req.body.answer
        }, {
            new: true,
            upsert: false
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },


    voteAnswer: function (req, res) {
        Post.findOneAndUpdate({
            _id: req.params.PostId,
            'answers._id': req.params.id
        }, {
            $push: {
                'answers.$.answerVotes': req.body.user
            }
        }, {
            new: true,
            upsert: false
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    }
}