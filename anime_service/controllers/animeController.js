const { Anime, Comment } = require('../models/Anime');
const mongoose = require('mongoose');

exports.postanime = async (req, res) => {
  const { animeName, animeDescription } = req.body;
    try {
        const newAnime = new Anime({ animeName, animeDescription, avgRating: 0 });
        await newAnime.save();
        res.status(201).json(newAnime);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create anime' });
    }
};

exports.getanimes = async (req, res) => {
    try {
        const animes = await Anime.find();
        res.status(200).json(animes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch animes' });
    }
};

exports.getanime = async (req, res) => {
    const { id } = req.params;
    try {
        const anime = await Anime.findById(id);
        if (!anime) return res.status(404).json({ error: 'Anime not found' });
        res.status(200).json(anime);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch anime' });
    }
};


exports.postcomment = async (req, res) => {
    const { animeId, userId, commentText, grade } = req.body;
    try {
        const newComment = new Comment({ animeId, userId, commentText, grade });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create comment' });
    }
};

exports.getcomments = async (req, res) => {
    const { animeId } = req.params;
   
    try {
        const comments = await Comment.find({animeId});

        if (comments.length === 0) {
        return res.status(200).json({
            message: 'No comments found for this anime.',
            comments: []
        });
        }
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
}

exports.getcommentsByUser = async (req, res) => {
    const { userId } = req.params;
    console.log(userId)
    try {
        const objectUserId = new mongoose.Types.ObjectId(userId);
        console.log(objectUserId)
        const comments = await Comment.find({ userId: objectUserId});
        console.log(comments)
        if (comments.length === 0) {
        return res.status(200).json({
            message: 'No comments for this anime',
            comments: []
        });
        }
        res.status(200).json(comments);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch comments by user' });
    }
}