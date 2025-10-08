const mongoose = require('mongoose');


const newSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    
    },
    description: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    publishedAt: {
        type: Date,
        default: Date.now
    }
},{timestamps:true})

const newsModel =  mongoose.model('News', newSchema);
module.exports = newsModel;