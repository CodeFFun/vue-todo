import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    endDate:{
        type: Date,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('Todo', TodoSchema);