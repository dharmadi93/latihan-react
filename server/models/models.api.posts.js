const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Number
    },
    comments: [
        {
            createdBy: {
                type: Schema.ObjectId,
                ref: 'User'
            },
            content: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true
})

Question.pre('find', function (next) {
    this.populate('createdBy', 'username')
    this.populate('comments.$.createdBy', 'username')
    next()
})

module.exports = mongoose.model('Question', Question)