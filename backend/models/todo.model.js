import mongoose from 'mongoose';
import timeago from 'timeago.js';

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 30
    },
    description: {
        type: String,
        required: false,
        trim: true,
        maxLength: 50,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

todoSchema.virtual('timeago').get(function () {
    return timeago.format(this.date); 
});
todoSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Todo', todoSchema);