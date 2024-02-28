import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        trim: true,
        required: [true, 'Text is required.'],
    },
    mainImage: {
        type: String,
    },
    body: {
        type: String,
        required: [true, 'Body is required.'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
    categories: [{ type: String }],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
})

PostSchema.virtual('url').get(function () {
    return '/post/' + this._id
})

const Post = models.Post || model('Post', PostSchema)

export default Post;