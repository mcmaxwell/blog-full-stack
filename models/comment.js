import { Schema, model, models } from 'mongoose';

const commentSchema = new Schema({
    body: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
})

const Comment = models.comment || model('Post', commentSchema)

export default Comment