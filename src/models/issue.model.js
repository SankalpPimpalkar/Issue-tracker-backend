import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved'],
        default: 'Open'
    },
    tags: [
        {
            type: String,
            trim: true
        }
    ],
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bucket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bucket',
        required: true
    }
}, { timestamps: true })

const Issue = mongoose.model('Issue', issueSchema)
export default Issue;