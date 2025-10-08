const express = require('express'); 
const router = express.Router();  
const news = require('../controllers/news.controller');  
const { authMiddleware } = require('../middlewares/auth.middleware');

router.get('/get-all-news',authMiddleware,news.getAllNews)
router.post('/create-news',authMiddleware, news.createNews)
router.get('/get-news/:id',authMiddleware,news.getNews)
router.patch('/update-news/:id',authMiddleware,news.updateNews)
router.delete('/delete-news/:id',authMiddleware,news.deleteNews)
module.exports = router;