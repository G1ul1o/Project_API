const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const jwt_secret = 'jojo-better-than-snk';

mongoose.connect("mongodb://localhost:27018/animelist_db");

const animeSchema = new mongoose.Schema({
  animeName: String,
  animeDescription: String,
  avgRating: Number
}); 

const commentSchema = new mongoose.Schema({
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  commentText: String,
  grade: Number
});

const Anime = mongoose.model("Anime", animeSchema);
const Comment = mongoose.model("Comment", commentSchema);

app.post('/anime', async (req, res) => {
  const { animeName, animeDescription } = req.body;
    try {
        const newAnime = new Anime({ animeName, animeDescription, avgRating: 0 });
        await newAnime.save();
        res.status(201).json(newAnime);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create anime' });
    }
}
);

app.get('/anime', async (req, res) => {
    try {
        const animes = await Anime.find();
        res.status(200).json(animes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch animes' });
    }
});

app.get('/anime/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const anime = await Anime.findById(id);
        if (!anime) return res.status(404).json({ error: 'Anime not found' });
        res.status(200).json(anime);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch anime' });
    }
});

app.listen(4001, () => console.log('Anime service running on http://localhost:4001'));