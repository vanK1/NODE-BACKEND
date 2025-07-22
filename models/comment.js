import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = Schema({
    comment: {
        type: String,
        require: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        require: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// The schema also includes references to a `Post` and a `User`, indicating that each
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
// This code defines a Mongoose schema and model for comments in a MongoDB database.
// The `commentSchema` defines a single field `coment` of type String, which is