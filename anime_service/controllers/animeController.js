const { Anime, Comment } = require('../models/Anime');

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

//Comment Controller Functions
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
        const comments = await Comment.find({ animeId }).populate('userId', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
}