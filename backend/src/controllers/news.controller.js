const newModel = require('../models/News.model');

const createNews = async (req, res) => {
const { title, description, author,status, publishedAt } = req.body;
const news = await newModel.findById(req.params.id);
if (news) {
    res.status(400).json({ msg: 'this news already exist' })
}
try {
const newNews = await newModel.create({
title,
description,
author:req.user?._id,
status,
publishedAt
})
res.status(201).json({ msg: 'News created', newNews })
}catch(e){
    console.log(e)
}
}


const updateNews = async (req, res) => {
const { title, description,status  } = req.body;
const news = await newModel.findById(req.params.id);
if (!news) {
 return   res.status(400).json({ msg: 'News not found' })
}
try {
const newNews = await newModel.findByIdAndUpdate(req.params.id, {
    title,
    description,
    status,
    
})
res.status(201).json({ msg: 'News updated', newNews })
}catch(e){
    console.log(e)
}
}
const deleteNews = async (req, res) => {
try {
    const newNews = await newModel.findByIdAndDelete(req.params.id)
    res.status(201).json({ msg: 'News deleted' })
}catch(e){
    console.log(e)
    res.status(400).json({ msg: 'Cant delete this news' })
}
}

const getNews = async (req, res) => {
try {
const newNews = await newModel.findById(req.params.id)
res.status(201).json({ msg: 'News found', newNews })
}catch(e){
    console.log(e)
    res.status(400).json({ msg: 'News not found' })
}
}

const getAllNews = async (req, res) => {
try {
const newNews = await newModel.find()   

const newses =  newNews.map(news => {
    return {
        title: news.title,
        description: news.description,
        author: news.author,
        status: news.status,
        publishedAt: news.publishedAt
    }
})
res.status(201).json({ msg: 'News found',newses  })
}catch(e){
    console.log(e)
    res.status(400).json({ msg: 'News not found' })
}
}
module.exports = {
createNews,
updateNews,
deleteNews,
getNews,
getAllNews
}