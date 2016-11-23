const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    PostId: {
        type: Number
    },
    title: {
        type: String,
        required: true
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

Post.pre('find', function (next) {
    this.populate('createdBy', 'username')
    this.populate('comments.$.createdBy', 'username')
    next()
})

module.exports = mongoose.model('Post', Post)