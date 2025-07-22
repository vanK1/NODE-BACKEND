import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = Schema({
    title: {
        type: String,
        require: true
    },
    snippet: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true
    },
    image: {
        url: String,
        filename: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    comments:{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    }
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema);
export default Post;