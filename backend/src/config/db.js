const mongoose = require('mongoose');

// const MONGO_URI ="mongodb+srv://vishalsinghlodhi16:Vi5halsingh16@khata-book.kntgkbh.mongodb.net/Veda?retryWrites=true&w=majority&appName=khata-book"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
    }catch(error){
        console.error("mongoose error ", error)
    }
}

module.exports = connectDB