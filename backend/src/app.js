const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDB =require('./config/db');
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/news.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cors())
app.use(cookieParser());
connectDB().then(()=>{
  console.log("connected to db");

}
)
app.get('/', (req, res) => {
  res.json('Hello, World!');
});

app.use('/api/auth',authRoutes);
app.use('/api',chatRoutes);

module.exports = app;