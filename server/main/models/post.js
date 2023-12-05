import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: []
    },
    imageUrl: {
        type: String
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timeStamps: true
});

export default mongoose.model('Post', PostSchema);